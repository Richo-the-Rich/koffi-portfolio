const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  addResponse,
  getUnreadContacts,
  getHighPriorityContacts,
  deleteContact
} = require('../controllers/contactController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name is required and cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('subject')
    .notEmpty()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject is required and cannot exceed 200 characters'),
  body('message')
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message is required and must be between 10 and 2000 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
];

// Public routes
// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactValidation, submitContact);

// Admin routes
// @route   GET /api/contact
// @desc    Get all contacts with filtering and pagination
// @access  Private (Admin)
router.get('/', verifyToken, requireAdmin, getContacts);

// @route   GET /api/contact/unread
// @desc    Get unread contacts
// @access  Private (Admin)
router.get('/unread', verifyToken, requireAdmin, getUnreadContacts);

// @route   GET /api/contact/priority
// @desc    Get high priority contacts
// @access  Private (Admin)
router.get('/priority', verifyToken, requireAdmin, getHighPriorityContacts);

// @route   GET /api/contact/:id
// @desc    Get contact by ID
// @access  Private (Admin)
router.get('/:id', verifyToken, requireAdmin, getContactById);

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private (Admin)
router.put('/:id/status', verifyToken, requireAdmin, [
  body('status')
    .isIn(['New', 'In Progress', 'Responded', 'Resolved', 'Closed'])
    .withMessage('Invalid status')
], updateContactStatus);

// @route   POST /api/contact/:id/response
// @desc    Add response to contact
// @access  Private (Admin)
router.post('/:id/response', verifyToken, requireAdmin, [
  body('response')
    .notEmpty()
    .trim()
    .withMessage('Response is required'),
  body('method')
    .optional()
    .isIn(['Email', 'Phone', 'LinkedIn', 'Other'])
    .withMessage('Invalid response method')
], addResponse);

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private (Admin)
router.delete('/:id', verifyToken, requireAdmin, deleteContact);

module.exports = router; 