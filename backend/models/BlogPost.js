const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'AI & Machine Learning',
      'API Development',
      'Web Development',
      'Data Science',
      'Cloud Computing',
      'DevOps',
      'Programming',
      'Tutorials',
      'Industry News',
      'Personal',
      'Other'
    ]
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  readTime: {
    type: Number, // in minutes
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  seoMeta: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      lowercase: true,
      trim: true
    }]
  },
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  }],
  relatedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  publishedAt: {
    type: Date
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  tableOfContents: [{
    level: Number,
    text: String,
    anchor: String
  }],
  estimatedReadingTime: {
    type: Number, // in minutes
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'fr', 'es', 'de', 'other']
  }
}, {
  timestamps: true
});

// Create slug from title before saving
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.isModified('slug')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Calculate estimated reading time (average 200 words per minute)
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.estimatedReadingTime = Math.ceil(wordCount / 200);
    this.readTime = this.estimatedReadingTime;
  }
  
  // Set published date if status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Update last modified date
  this.lastModified = new Date();
  
  next();
});

// Indexes for search and performance
blogPostSchema.index({ 
  title: 'text', 
  excerpt: 'text', 
  content: 'text', 
  tags: 'text' 
});
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1, publishedAt: -1 });
blogPostSchema.index({ isFeatured: -1, publishedAt: -1 });
blogPostSchema.index({ author: 1, publishedAt: -1 });
blogPostSchema.index({ tags: 1 });

// Virtual for URL
blogPostSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

// Virtual for reading time text
blogPostSchema.virtual('readTimeText').get(function() {
  return `${this.readTime} min read`;
});

// Virtual for formatted publish date
blogPostSchema.virtual('formattedPublishDate').get(function() {
  if (!this.publishedAt) return null;
  return this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to get published posts
blogPostSchema.statics.getPublished = function(options = {}) {
  const { 
    limit = 10, 
    skip = 0, 
    category = null, 
    tags = null,
    featured = null 
  } = options;
  
  const query = { status: 'published' };
  
  if (category) query.category = category;
  if (tags) query.tags = { $in: tags };
  if (featured !== null) query.isFeatured = featured;
  
  return this.find(query)
    .populate('author', 'firstName lastName profileImage')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to get featured posts
blogPostSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ 
    status: 'published', 
    isFeatured: true 
  })
    .populate('author', 'firstName lastName profileImage')
    .sort({ publishedAt: -1 })
    .limit(limit);
};

// Static method to get related posts
blogPostSchema.statics.getRelated = function(postId, category, tags, limit = 3) {
  return this.find({
    _id: { $ne: postId },
    status: 'published',
    $or: [
      { category: category },
      { tags: { $in: tags } }
    ]
  })
    .populate('author', 'firstName lastName profileImage')
    .sort({ publishedAt: -1 })
    .limit(limit);
};

// Instance method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Instance method to increment likes
blogPostSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save({ validateBeforeSave: false });
};

// Ensure virtual fields are serialized
blogPostSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);