const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add IP address and user agent
    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    };

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: contact._id,
        status: contact.status
      }
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get all contacts (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      priority,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isSpam: false };
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('adminNotes.addedBy', 'firstName lastName')
      .populate('responseHistory.respondedBy', 'firstName lastName');

    // Get total count
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalContacts: total,
          hasNext: skip + contacts.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get contact by ID (Admin)
// @route   GET /api/contact/:id
// @access  Private (Admin)
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id)
      .populate('adminNotes.addedBy', 'firstName lastName')
      .populate('responseHistory.respondedBy', 'firstName lastName');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Mark as read if not already
    if (!contact.isRead) {
      await contact.markAsRead();
    }

    res.json({
      success: true,
      data: {
        contact
      }
    });
  } catch (error) {
    console.error('Get contact by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update contact status (Admin)
// @route   PUT /api/contact/:id/status
// @access  Private (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: {
        contact
      }
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Add response to contact (Admin)
// @route   POST /api/contact/:id/response
// @access  Private (Admin)
const addResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, method = 'Email' } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    const responseData = {
      respondedBy: req.user._id,
      response,
      method
    };

    await contact.addResponse(responseData);

    res.json({
      success: true,
      message: 'Response added successfully',
      data: {
        contact
      }
    });
  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding response',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get unread contacts (Admin)
// @route   GET /api/contact/unread
// @access  Private (Admin)
const getUnreadContacts = async (req, res) => {
  try {
    const contacts = await Contact.getUnread();

    res.json({
      success: true,
      data: {
        contacts,
        count: contacts.length
      }
    });
  } catch (error) {
    console.error('Get unread contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching unread contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get high priority contacts (Admin)
// @route   GET /api/contact/priority
// @access  Private (Admin)
const getHighPriorityContacts = async (req, res) => {
  try {
    const contacts = await Contact.getHighPriority();

    res.json({
      success: true,
      data: {
        contacts,
        count: contacts.length
      }
    });
  } catch (error) {
    console.error('Get high priority contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching high priority contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete contact (Admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  addResponse,
  getUnreadContacts,
  getHighPriorityContacts,
  deleteContact
}; 