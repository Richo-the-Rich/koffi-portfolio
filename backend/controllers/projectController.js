const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      featured,
      technologies,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isPublic: true };

    if (category) query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';
    if (technologies) {
      const techArray = technologies.split(',');
      query.technologies = { $in: techArray };
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const projects = await Project.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('relatedProjects', 'title slug featuredImage category');

    // Get total count for pagination
    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalProjects: total,
          hasNext: skip + projects.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const projects = await Project.find({ 
      featured: true, 
      isPublic: true 
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        projects
      }
    });
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ 
      slug, 
      isPublic: true 
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment view count
    project.viewCount += 1;
    await project.save({ validateBeforeSave: false });

    res.json({
      success: true,
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Get project by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Create project error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
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

    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Update project error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Like project
// @route   PUT /api/projects/:id/like
// @access  Public
const likeProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.likes += 1;
    await project.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: 'Project liked successfully',
      data: {
        likes: project.likes
      }
    });
  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get project categories
// @route   GET /api/projects/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Project.distinct('category', { isPublic: true });

    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get project technologies
// @route   GET /api/projects/technologies
// @access  Public
const getTechnologies = async (req, res) => {
  try {
    const technologies = await Project.distinct('technologies', { isPublic: true });

    res.json({
      success: true,
      data: {
        technologies: technologies.sort()
      }
    });
  } catch (error) {
    console.error('Get technologies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching technologies',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  getCategories,
  getTechnologies
}; 