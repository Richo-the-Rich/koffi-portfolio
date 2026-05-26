const express = require('express');
const { body } = require('express-validator');
const {
  getSkills,
  getFeaturedSkills,
  getSkillsByCategory,
  createSkill,
  updateSkill,
  deleteSkill,
  getCategories
} = require('../controllers/skillController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const skillValidation = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Skill name is required and cannot exceed 50 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('proficiency')
    .isInt({ min: 1, max: 5 })
    .withMessage('Proficiency must be between 1 and 5'),
  body('yearsOfExperience')
    .isFloat({ min: 0, max: 50 })
    .withMessage('Years of experience must be between 0 and 50')
];

// Public routes
// @route   GET /api/skills
// @desc    Get all skills with filtering
// @access  Public
router.get('/', getSkills);

// @route   GET /api/skills/featured
// @desc    Get featured skills
// @access  Public
router.get('/featured', getFeaturedSkills);

// @route   GET /api/skills/categories
// @desc    Get all skill categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/skills/category/:category
// @desc    Get skills by category
// @access  Public
router.get('/category/:category', getSkillsByCategory);

// Admin routes
// @route   POST /api/skills
// @desc    Create new skill
// @access  Private (Admin)
router.post('/', verifyToken, requireAdmin, skillValidation, createSkill);

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private (Admin)
router.put('/:id', verifyToken, requireAdmin, skillValidation, updateSkill);

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private (Admin)
router.delete('/:id', verifyToken, requireAdmin, deleteSkill);

module.exports = router; 