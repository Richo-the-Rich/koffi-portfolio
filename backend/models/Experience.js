const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  companyUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v);
      },
      message: 'Please enter a valid company URL'
    }
  },
  companyLogo: {
    type: String, // URL to company logo
    default: null
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  employmentType: {
    type: String,
    required: [true, 'Employment type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Volunteer']
  },
  workMode: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    default: 'On-site'
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
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  responsibilities: [{
    type: String,
    required: true,
    maxlength: [300, 'Responsibility cannot exceed 300 characters']
  }],
  achievements: [{
    type: String,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1']
  },
  industry: {
    type: String,
    maxlength: [50, 'Industry cannot exceed 50 characters']
  },
  salary: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'Other']
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  references: [{
    name: String,
    title: String,
    email: String,
    phone: String,
    relationship: String
  }],
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for sorting and filtering
experienceSchema.index({ startDate: -1, endDate: -1 });
experienceSchema.index({ isCurrent: -1, startDate: -1 });
experienceSchema.index({ company: 1, jobTitle: 1 });

// Virtual for duration
experienceSchema.virtual('duration').get(function() {
  const start = new Date(this.startDate);
  const end = this.isCurrent ? new Date() : new Date(this.endDate);
  
  const diffTime = Math.abs(end - start);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month' : `${diffMonths} months`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  let result = years === 1 ? '1 year' : `${years} years`;
  if (remainingMonths > 0) {
    result += remainingMonths === 1 ? ' 1 month' : ` ${remainingMonths} months`;
  }
  
  return result;
});

// Virtual for formatted date range
experienceSchema.virtual('dateRange').get(function() {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
  
  const start = formatDate(this.startDate);
  const end = this.isCurrent ? 'Present' : formatDate(this.endDate);
  
  return `${start} - ${end}`;
});

// Method to calculate total experience in months
experienceSchema.methods.getTotalMonths = function() {
  const start = new Date(this.startDate);
  const end = this.isCurrent ? new Date() : new Date(this.endDate);
  
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
};

// Static method to get current positions
experienceSchema.statics.getCurrentPositions = function() {
  return this.find({ isCurrent: true, isVisible: true })
    .populate('skills projects')
    .sort({ startDate: -1 });
};

// Static method to get experience timeline
experienceSchema.statics.getTimeline = function() {
  return this.find({ isVisible: true })
    .populate('skills projects')
    .sort({ startDate: -1, order: 1 });
};

// Pre-save middleware to handle current position logic
experienceSchema.pre('save', function(next) {
  if (this.isCurrent) {
    this.endDate = null;
  }
  next();
});

// Ensure virtual fields are serialized
experienceSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    if (ret.salary && !ret.salary.isPublic) {
      delete ret.salary.amount;
    }
    return ret;
  }
});

module.exports = mongoose.model('Experience', experienceSchema); 