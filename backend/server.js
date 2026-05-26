const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware de sécurité
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/blog', require('./routes/blog'));

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Portfolio API v1.0.0',
    documentation: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'PUT /api/auth/password',
        logout: 'POST /api/auth/logout'
      },
      projects: {
        getAll: 'GET /api/projects',
        getFeatured: 'GET /api/projects/featured',
        getBySlug: 'GET /api/projects/:slug',
        getCategories: 'GET /api/projects/categories',
        getTechnologies: 'GET /api/projects/technologies',
        like: 'PUT /api/projects/:id/like',
        create: 'POST /api/projects (Admin)',
        update: 'PUT /api/projects/:id (Admin)',
        delete: 'DELETE /api/projects/:id (Admin)'
      },
      skills: {
        getAll: 'GET /api/skills',
        getFeatured: 'GET /api/skills/featured',
        getByCategory: 'GET /api/skills/category/:category',
        getCategories: 'GET /api/skills/categories',
        create: 'POST /api/skills (Admin)',
        update: 'PUT /api/skills/:id (Admin)',
        delete: 'DELETE /api/skills/:id (Admin)'
      },
      experience: {
        getAll: 'GET /api/experience',
        getTimeline: 'GET /api/experience/timeline',
        getCurrent: 'GET /api/experience/current',
        getSummary: 'GET /api/experience/summary',
        getById: 'GET /api/experience/:id',
        create: 'POST /api/experience (Admin)',
        update: 'PUT /api/experience/:id (Admin)',
        delete: 'DELETE /api/experience/:id (Admin)'
      },
      blog: {
        getAll: 'GET /api/blog',
        getFeatured: 'GET /api/blog/featured',
        getBySlug: 'GET /api/blog/:slug',
        getCategories: 'GET /api/blog/categories',
        getTags: 'GET /api/blog/tags',
        like: 'PUT /api/blog/:id/like',
        getAllAdmin: 'GET /api/blog/admin/posts (Admin)',
        create: 'POST /api/blog (Admin)',
        update: 'PUT /api/blog/:id (Admin)',
        delete: 'DELETE /api/blog/:id (Admin)'
      },
      contact: {
        submit: 'POST /api/contact',
        getAll: 'GET /api/contact (Admin)',
        getById: 'GET /api/contact/:id (Admin)',
        getUnread: 'GET /api/contact/unread (Admin)',
        getPriority: 'GET /api/contact/priority (Admin)',
        updateStatus: 'PUT /api/contact/:id/status (Admin)',
        addResponse: 'POST /api/contact/:id/response (Admin)',
        delete: 'DELETE /api/contact/:id (Admin)'
      }
    },
    status: 'Active',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 