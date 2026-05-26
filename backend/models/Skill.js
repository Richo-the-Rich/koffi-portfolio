const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: [
      'Programming Languages',
      'Frameworks & Libraries',
      'AI & Machine Learning',
      'Databases',
      'Cloud & DevOps',
      'Tools & Software',
      'Soft Skills',
      'Other'
    ]
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [1, 'Proficiency must be between 1 and 5'],
    max: [5, 'Proficiency must be between 1 and 5']
  },
  yearsOfExperience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Years of experience cannot be negative'],
    max: [50, 'Years of experience cannot exceed 50']
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  icon: {
    type: String, // URL to icon or icon name
    default: null
  },
  color: {
    type: String, // Hex color for UI representation
    default: '#3B82F6',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  certifications: [{
    name: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    credentialUrl: String
  }],
  relatedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  lastUsed: {
    type: Date,
    default: Date.now
  },
  endorsements: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search and filtering
skillSchema.index({ category: 1, proficiency: -1 });
skillSchema.index({ featured: -1, proficiency: -1 });
skillSchema.index({ name: 'text', description: 'text' });

// Virtual for proficiency label
skillSchema.virtual('proficiencyLabel').get(function() {
  const labels = {
    1: 'Beginner',
    2: 'Novice', 
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };
  return labels[this.proficiency] || 'Unknown';
});

// Virtual for experience level
skillSchema.virtual('experienceLevel').get(function() {
  if (this.yearsOfExperience < 1) return 'Entry Level';
  if (this.yearsOfExperience < 3) return 'Junior';
  if (this.yearsOfExperience < 7) return 'Mid-Level';
  if (this.yearsOfExperience < 12) return 'Senior';
  return 'Expert';
});

// Method to calculate skill score (combination of proficiency and experience)
skillSchema.methods.calculateSkillScore = function() {
  const proficiencyWeight = 0.6;
  const experienceWeight = 0.4;
  const maxExperience = 10; // Cap experience at 10 years for scoring
  
  const normalizedExperience = Math.min(this.yearsOfExperience, maxExperience) / maxExperience;
  const normalizedProficiency = this.proficiency / 5;
  
  return Math.round(
    (normalizedProficiency * proficiencyWeight + normalizedExperience * experienceWeight) * 100
  );
};

// Static method to get skills by category
skillSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true })
    .sort({ proficiency: -1, yearsOfExperience: -1 });
};

// Static method to get featured skills
skillSchema.statics.getFeatured = function() {
  return this.find({ featured: true, isActive: true })
    .sort({ proficiency: -1, yearsOfExperience: -1 });
};

// Ensure virtual fields are serialized
skillSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Skill', skillSchema); 