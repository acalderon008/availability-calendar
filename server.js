const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://acalderon008.github.io', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// In-memory storage (in production, use a database)
const calendars = new Map();
const sharedCalendars = new Map();

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Create a new calendar
app.post('/api/calendars', (req, res) => {
  const { name, description } = req.body;
  const calendarId = uuidv4();
  const shareId = uuidv4();
  
  const calendar = {
    id: calendarId,
    shareId: shareId,
    name: name || 'My Calendar',
    description: description || '',
    createdAt: new Date().toISOString(),
    availability: [],
    participants: []
  };
  
  calendars.set(calendarId, calendar);
  sharedCalendars.set(shareId, calendarId);
  
  res.json({
    success: true,
    calendar: {
      id: calendarId,
      shareId: shareId,
      name: calendar.name,
      description: calendar.description
    }
  });
});

// Get calendar by ID
app.get('/api/calendars/:id', (req, res) => {
  const calendar = calendars.get(req.params.id);
  if (!calendar) {
    return res.status(404).json({ success: false, message: 'Calendar not found' });
  }
  res.json({ success: true, calendar });
});

// Get calendar by share ID
app.get('/api/share/:shareId', (req, res) => {
  const calendarId = sharedCalendars.get(req.params.shareId);
  if (!calendarId) {
    return res.status(404).json({ success: false, message: 'Shared calendar not found' });
  }
  
  const calendar = calendars.get(calendarId);
  if (!calendar) {
    return res.status(404).json({ success: false, message: 'Calendar not found' });
  }
  
  res.json({ success: true, calendar });
});

// Add availability to calendar
app.post('/api/calendars/:id/availability', (req, res) => {
  const { name, dates, times } = req.body;
  const calendar = calendars.get(req.params.id);
  
  if (!calendar) {
    return res.status(404).json({ success: false, message: 'Calendar not found' });
  }
  
  const availability = {
    id: uuidv4(),
    name: name || 'Anonymous',
    dates: dates || [],
    times: times || [],
    addedAt: new Date().toISOString()
  };
  
  calendar.availability.push(availability);
  calendar.participants.push(name);
  
  res.json({ success: true, availability });
});

// Get all calendars (for demo purposes)
app.get('/api/calendars', (req, res) => {
  const allCalendars = Array.from(calendars.values()).map(cal => ({
    id: cal.id,
    shareId: cal.shareId,
    name: cal.name,
    description: cal.description,
    createdAt: cal.createdAt,
    participantCount: cal.participants.length
  }));
  
  res.json({ success: true, calendars: allCalendars });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the build directory
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    // Serve index.html for client-side routing
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 