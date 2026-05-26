const express = require('express');
const { body } = require('express-validator');
const {
  getBlogPosts,
  getFeaturedPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  likeBlogPost,
  getCategories,
  getTags,
  getAllBlogPosts
} = require('../controllers/blogPostController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const blogPostValidation = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title is required and cannot exceed 200 characters'),
  body('excerpt')
    .notEmpty()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Excerpt is required and cannot exceed 300 characters'),
  body('content')
    .notEmpty()
    .trim()
    .withMessage('Content is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived'),
  body('featuredImage.url')
    .optional()
    .isURL()
    .withMessage('Featured image URL must be valid'),
  body('seoMeta.metaTitle')
    .optional()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters'),
  body('seoMeta.metaDescription')
    .optional()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters')
];

// Public routes
// @route   GET /api/blog
// @desc    Get all published blog posts with filtering and pagination
// @access  Public
router.get('/', getBlogPosts);

// @route   GET /api/blog/featured
// @desc    Get featured blog posts
// @access  Public
router.get('/featured', getFeaturedPosts);

// @route   GET /api/blog/categories
// @desc    Get all blog categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/blog/tags
// @desc    Get all blog tags
// @access  Public
router.get('/tags', getTags);

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', getBlogPostBySlug);

// @route   PUT /api/blog/:id/like
// @desc    Like a blog post
// @access  Public
router.put('/:id/like', likeBlogPost);

// Admin routes
// @route   GET /api/blog/admin/posts
// @desc    Get all blog posts (including drafts) for admin
// @access  Private (Admin)
router.get('/admin/posts', verifyToken, requireAdmin, getAllBlogPosts);

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private (Admin)
router.post('/', verifyToken, requireAdmin, blogPostValidation, createBlogPost);

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private (Admin)
router.put('/:id', verifyToken, requireAdmin, blogPostValidation, updateBlogPost);

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private (Admin)
router.delete('/:id', verifyToken, requireAdmin, deleteBlogPost);

module.exports = router; 