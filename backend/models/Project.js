const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: [
      'Machine Learning',
      'Deep Learning', 
      'NLP',
      'Computer Vision',
      'API Development',
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Other'
    ]
  },
  technologies: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Planned', 'On Hold'],
    default: 'In Progress'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https:\/\/github\.com\//.test(v);
      },
      message: 'Please enter a valid GitHub URL'
    }
  },
  liveUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  demoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v);
      },
      message: 'Please enter a valid demo URL'
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v >= this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1'],
    default: 1
  },
  myRole: {
    type: String,
    maxlength: [200, 'Role description cannot exceed 200 characters']
  },
  achievements: [{
    type: String,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title before saving
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for search
projectSchema.index({ 
  title: 'text', 
  description: 'text', 
  technologies: 'text',
  tags: 'text'
});

// Index for featured projects
projectSchema.index({ featured: -1, createdAt: -1 });

// Virtual for duration
projectSchema.virtual('duration').get(function() {
  if (!this.endDate) return 'In Progress';
  
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${diffDays} days`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months`;
  return `${Math.ceil(diffDays / 365)} years`;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Project', projectSchema); 