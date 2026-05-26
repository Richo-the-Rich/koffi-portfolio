const express = require('express');
const { body } = require('express-validator');
const {
  getExperiences,
  getTimeline,
  getCurrentPositions,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperienceSummary
} = require('../controllers/experienceController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const experienceValidation = [
  body('jobTitle')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Job title is required and cannot exceed 100 characters'),
  body('company')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name is required and cannot exceed 100 characters'),
  body('location')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location is required and cannot exceed 100 characters'),
  body('employmentType')
    .notEmpty()
    .isIn(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Volunteer'])
    .withMessage('Valid employment type is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Valid start date is required'),
  body('description')
    .notEmpty()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description is required and cannot exceed 1000 characters'),
  body('responsibilities')
    .isArray({ min: 1 })
    .withMessage('At least one responsibility is required'),
  body('companyUrl')
    .optional()
    .isURL()
    .withMessage('Please enter a valid company URL'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Please enter a valid end date'),
  body('teamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Team size must be at least 1')
];

// Public routes
// @route   GET /api/experience
// @desc    Get all experiences with filtering
// @access  Public
router.get('/', getExperiences);

// @route   GET /api/experience/timeline
// @desc    Get experience timeline
// @access  Public
router.get('/timeline', getTimeline);

// @route   GET /api/experience/current
// @desc    Get current positions
// @access  Public
router.get('/current', getCurrentPositions);

// @route   GET /api/experience/summary
// @desc    Get experience summary with totals
// @access  Public
router.get('/summary', getExperienceSummary);

// @route   GET /api/experience/:id
// @desc    Get experience by ID
// @access  Public
router.get('/:id', getExperienceById);

// Admin routes
// @route   POST /api/experience
// @desc    Create new experience
// @access  Private (Admin)
router.post('/', verifyToken, requireAdmin, experienceValidation, createExperience);

// @route   PUT /api/experience/:id
// @desc    Update experience
// @access  Private (Admin)
router.put('/:id', verifyToken, requireAdmin, experienceValidation, updateExperience);

// @route   DELETE /api/experience/:id
// @desc    Delete experience
// @access  Private (Admin)
router.delete('/:id', verifyToken, requireAdmin, deleteExperience);

module.exports = router; 