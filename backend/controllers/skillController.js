const Skill = require('../models/Skill');
const { validationResult } = require('express-validator');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const { category, featured, sort = 'proficiency' } = req.query;

    // Build query
    const query = { isActive: true };
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';

    const skills = await Skill.find(query)
      .sort({ [sort]: -1, yearsOfExperience: -1 })
      .populate('relatedProjects', 'title slug');

    res.json({
      success: true,
      data: {
        skills
      }
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get featured skills
// @route   GET /api/skills/featured
// @access  Public
const getFeaturedSkills = async (req, res) => {
  try {
    const skills = await Skill.getFeatured();

    res.json({
      success: true,
      data: {
        skills
      }
    });
  } catch (error) {
    console.error('Get featured skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured skills',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get skills by category
// @route   GET /api/skills/category/:category
// @access  Public
const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.getByCategory(category);

    res.json({
      success: true,
      data: {
        skills
      }
    });
  } catch (error) {
    console.error('Get skills by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skills by category',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const skill = new Skill(req.body);
    await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Create skill error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating skill',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = async (req, res) => {
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

    const skill = await Skill.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('relatedProjects', 'title slug');

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating skill',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get skill categories
// @route   GET /api/skills/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Skill.distinct('category', { isActive: true });

    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get skill categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skill categories',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getSkills,
  getFeaturedSkills,
  getSkillsByCategory,
  createSkill,
  updateSkill,
  deleteSkill,
  getCategories
}; 