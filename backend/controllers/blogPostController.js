const BlogPost = require('../models/BlogPost');
const { validationResult } = require('express-validator');

// @desc    Get all published blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tags,
      search,
      featured,
      sort = '-publishedAt'
    } = req.query;

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    };

    if (category) options.category = category;
    if (featured !== undefined) options.featured = featured === 'true';
    if (tags) options.tags = tags.split(',');

    // Add search query if provided
    if (search) {
      const posts = await BlogPost.find({
        status: 'published',
        $text: { $search: search }
      })
        .populate('author', 'firstName lastName profileImage')
        .populate('relatedProjects', 'title slug category')
        .sort(sort)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));

      const total = await BlogPost.countDocuments({
        status: 'published',
        $text: { $search: search }
      });

      return res.json({
        success: true,
        data: {
          posts,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalPosts: total,
            hasNext: (parseInt(page) * parseInt(limit)) < total,
            hasPrev: parseInt(page) > 1
          }
        }
      });
    }

    const posts = await BlogPost.getPublished(options);
    const total = await BlogPost.countDocuments({ 
      status: 'published',
      ...(category && { category }),
      ...(featured !== undefined && { isFeatured: featured === 'true' }),
      ...(tags && { tags: { $in: tags.split(',') } })
    });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalPosts: total,
          hasNext: (parseInt(page) * parseInt(limit)) < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedPosts = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const posts = await BlogPost.getFeatured(parseInt(limit));

    res.json({
      success: true,
      data: {
        posts
      }
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOne({ 
      slug, 
      status: 'published' 
    })
      .populate('author', 'firstName lastName profileImage bio')
      .populate('relatedPosts', 'title slug excerpt featuredImage publishedAt')
      .populate('relatedProjects', 'title slug description featuredImage category');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await post.incrementViews();

    // Get related posts if not already populated
    if (!post.relatedPosts || post.relatedPosts.length === 0) {
      const relatedPosts = await BlogPost.getRelated(post._id, post.category, post.tags, 3);
      post.relatedPosts = relatedPosts;
    }

    res.json({
      success: true,
      data: {
        post
      }
    });
  } catch (error) {
    console.error('Get blog post by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private (Admin)
const createBlogPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const postData = {
      ...req.body,
      author: req.user._id
    };

    const post = new BlogPost(postData);
    await post.save();

    // Populate author before sending response
    await post.populate('author', 'firstName lastName profileImage');

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: {
        post
      }
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin)
const updateBlogPost = async (req, res) => {
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

    const post = await BlogPost.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('author', 'firstName lastName profileImage')
      .populate('relatedProjects', 'title slug category');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: {
        post
      }
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Like blog post
// @route   PUT /api/blog/:id/like
// @access  Public
const likeBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await post.incrementLikes();

    res.json({
      success: true,
      message: 'Blog post liked successfully',
      data: {
        likes: post.likes
      }
    });
  } catch (error) {
    console.error('Like blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });

    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get all blog tags
// @route   GET /api/blog/tags
// @access  Public
const getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { status: 'published' });

    res.json({
      success: true,
      data: {
        tags: tags.sort()
      }
    });
  } catch (error) {
    console.error('Get blog tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get all blog posts (Admin)
// @route   GET /api/blog/admin
// @access  Private (Admin)
const getAllBlogPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const posts = await BlogPost.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('author', 'firstName lastName profileImage');

    // Get total count
    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalPosts: total,
          hasNext: skip + posts.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
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
}; 