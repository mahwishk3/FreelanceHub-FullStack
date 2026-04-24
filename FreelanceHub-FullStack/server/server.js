// server/server.js — Main Express Server

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());                                      // parse JSON bodies
app.use(express.static(path.join(__dirname, '../client')));   // serve frontend files

// ── API Routes ──────────────────────────────────────────────────────────────
const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api', serviceRoutes);

// ── Serve index.html for all non-API routes ─────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler Middleware ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ FreelanceHub server running at http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from /client`);
  console.log(`🔗 API available at http://localhost:${PORT}/api/services`);
});
