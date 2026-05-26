const Experience = require('../models/Experience');
const { validationResult } = require('express-validator');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const { current, sort = '-startDate' } = req.query;
    
    // Build query
    const query = { isVisible: true };
    if (current !== undefined) query.isCurrent = current === 'true';

    const experiences = await Experience.find(query)
      .sort(sort)
      .populate('skills', 'name category proficiency')
      .populate('projects', 'title slug category');

    res.json({
      success: true,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching experiences',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get experience timeline
// @route   GET /api/experience/timeline
// @access  Public
const getTimeline = async (req, res) => {
  try {
    const experiences = await Experience.getTimeline();

    res.json({
      success: true,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get timeline error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching timeline',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get current positions
// @route   GET /api/experience/current
// @access  Public
const getCurrentPositions = async (req, res) => {
  try {
    const experiences = await Experience.getCurrentPositions();

    res.json({
      success: true,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get current positions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching current positions',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get experience by ID
// @route   GET /api/experience/:id
// @access  Public
const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findOne({ 
      _id: id, 
      isVisible: true 
    })
      .populate('skills', 'name category proficiency')
      .populate('projects', 'title slug category featuredImage');

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Get experience by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching experience',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private (Admin)
const createExperience = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const experience = new Experience(req.body);
    await experience.save();

    // Populate related fields before sending response
    await experience.populate('skills projects');

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating experience',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private (Admin)
const updateExperience = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;

    const experience = await Experience.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('skills', 'name category proficiency')
      .populate('projects', 'title slug category');

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating experience',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting experience',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get total experience summary
// @route   GET /api/experience/summary
// @access  Public
const getExperienceSummary = async (req, res) => {
  try {
    const experiences = await Experience.find({ isVisible: true });

    let totalMonths = 0;
    const companies = [];
    const industries = new Set();
    const technologies = new Set();

    experiences.forEach(exp => {
      totalMonths += exp.getTotalMonths();
      companies.push(exp.company);
      if (exp.industry) industries.add(exp.industry);
      exp.technologies.forEach(tech => technologies.add(tech));
    });

    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    res.json({
      success: true,
      data: {
        summary: {
          totalExperience: `${totalYears} years ${remainingMonths} months`,
          totalMonths,
          totalYears,
          totalPositions: experiences.length,
          currentPositions: experiences.filter(exp => exp.isCurrent).length,
          companies: [...new Set(companies)],
          industries: [...industries],
          technologies: [...technologies],
          firstJobDate: experiences.length > 0 ? Math.min(...experiences.map(exp => exp.startDate)) : null
        }
      }
    });
  } catch (error) {
    console.error('Get experience summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching experience summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getExperiences,
  getTimeline,
  getCurrentPositions,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperienceSummary
}; 