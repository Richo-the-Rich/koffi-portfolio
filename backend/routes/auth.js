const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .trim()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .trim()
    .withMessage('Last name is required'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateProfileValidation = [
  body('firstName')
    .optional()
    .notEmpty()
    .trim()
    .withMessage('First name cannot be empty'),
  body('lastName')
    .optional()
    .notEmpty()
    .trim()
    .withMessage('Last name cannot be empty'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

// @route   POST /api/auth/register
// @desc    Register admin user
// @access  Public (should be restricted in production)
router.post('/register', registerValidation, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, login);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', verifyToken, getMe);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', verifyToken, updateProfileValidation, updateProfile);

// @route   PUT /api/auth/password
// @desc    Change password
// @access  Private
router.put('/password', verifyToken, changePasswordValidation, changePassword);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', verifyToken, logout);

module.exports = router;