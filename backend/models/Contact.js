const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters'],
    validate: {
      validator: function(v) {
        return !v || /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    minlength: [10, 'Message must be at least 10 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'General Inquiry',
      'Project Collaboration',
      'Job Opportunity',
      'Consulting',
      'AI/ML Project',
      'API Development',
      'Speaking Engagement',
      'Media Interview',
      'Partnership',
      'Other'
    ],
    default: 'General Inquiry'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Responded', 'Resolved', 'Closed'],
    default: 'New'
  },
  source: {
    type: String,
    enum: ['Website', 'LinkedIn', 'Email', 'Referral', 'Other'],
    default: 'Website'
  },
  budget: {
    range: {
      type: String,
      enum: [
        'Under $1,000',
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        'Over $50,000',
        'Not specified'
      ],
      default: 'Not specified'
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'Other']
    }
  },
  timeline: {
    type: String,
    enum: [
      'ASAP',
      'Within 1 month',
      'Within 3 months',
      'Within 6 months',
      'More than 6 months',
      'Not specified'
    ],
    default: 'Not specified'
  },
  projectType: {
    type: String,
    enum: [
      'AI/ML Development',
      'API Development',
      'Web Application',
      'Mobile Application',
      'Data Science',
      'Consulting',
      'Training/Workshop',
      'Research',
      'Other'
    ]
  },
  referredBy: {
    type: String,
    trim: true,
    maxlength: [100, 'Referrer name cannot exceed 100 characters']
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  }],
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  adminNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  responseHistory: [{
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: {
      type: Date,
      default: Date.now
    },
    response: String,
    method: {
      type: String,
      enum: ['Email', 'Phone', 'LinkedIn', 'Other'],
      default: 'Email'
    }
  }],
  followUpDate: {
    type: Date
  },
  closedAt: {
    type: Date
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for search and filtering
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ category: 1, priority: 1 });
contactSchema.index({ isRead: 1, isStarred: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ 
  name: 'text', 
  email: 'text', 
  subject: 'text', 
  message: 'text',
  company: 'text'
});

// Virtual for formatted creation date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for response time (if responded)
contactSchema.virtual('responseTime').get(function() {
  if (this.responseHistory.length === 0) return null;
  
  const firstResponse = this.responseHistory[0];
  const diffTime = firstResponse.respondedAt - this.createdAt;
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  
  if (diffHours < 24) return `${diffHours} hours`;
  const diffDays = Math.ceil(diffHours / 24);
  return `${diffDays} days`;
});

// Static method to get unread messages
contactSchema.statics.getUnread = function() {
  return this.find({ isRead: false, isSpam: false })
    .sort({ createdAt: -1 });
};

// Static method to get by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status, isSpam: false })
    .sort({ createdAt: -1 });
};

// Static method to get high priority messages
contactSchema.statics.getHighPriority = function() {
  return this.find({ 
    priority: { $in: ['High', 'Urgent'] }, 
    status: { $nin: ['Resolved', 'Closed'] },
    isSpam: false 
  })
    .sort({ priority: 1, createdAt: -1 });
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Instance method to add response
contactSchema.methods.addResponse = function(responseData) {
  this.responseHistory.push(responseData);
  if (this.status === 'New') {
    this.status = 'Responded';
  }
  return this.save();
};

// Instance method to close message
contactSchema.methods.closeMessage = function() {
  this.status = 'Closed';
  this.closedAt = new Date();
  return this.save();
};

// Pre-save middleware to handle status changes
contactSchema.pre('save', function(next) {
  // Auto-close if resolved for more than 30 days
  if (this.status === 'Resolved' && !this.closedAt) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (this.updatedAt < thirtyDaysAgo) {
      this.status = 'Closed';
      this.closedAt = new Date();
    }
  }
  
  next();
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.ipAddress; // Remove sensitive data from JSON output
    delete ret.userAgent;
    return ret;
  }
});

module.exports = mongoose.model('Contact', contactSchema); 