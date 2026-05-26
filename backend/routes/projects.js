const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  getCategories,
  getTechnologies
} = require('../controllers/projectController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title is required and cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description is required and cannot exceed 500 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Valid start date is required')
];

// Public routes
// @route   GET /api/projects
// @desc    Get all projects with filtering and pagination
// @access  Public
router.get('/', getProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', getFeaturedProjects);

// @route   GET /api/projects/categories
// @desc    Get all project categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/projects/technologies
// @desc    Get all technologies used in projects
// @access  Public
router.get('/technologies', getTechnologies);

// @route   GET /api/projects/:slug
// @desc    Get project by slug
// @access  Public
router.get('/:slug', getProjectBySlug);

// @route   PUT /api/projects/:id/like
// @desc    Like a project
// @access  Public
router.put('/:id/like', likeProject);

// Admin routes
// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin)
router.post('/', verifyToken, requireAdmin, projectValidation, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/:id', verifyToken, requireAdmin, projectValidation, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/:id', verifyToken, requireAdmin, deleteProject);

module.exports = router; 