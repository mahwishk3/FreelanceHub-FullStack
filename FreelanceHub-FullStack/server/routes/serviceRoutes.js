// routes/serviceRoutes.js
// Defines all API routes and maps them to controller functions

const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  addService,
  saveService,
  hireService,
  getSaved,
  getHired,
  removeSaved
} = require('../controllers/servicesController');

// Services routes
router.get('/services',       getAllServices);   // GET  all services
router.get('/services/:id',   getServiceById);  // GET  single service
router.post('/services',      addService);      // POST new service (bonus)

// Save / Hire routes
router.post('/save',          saveService);     // POST save a service
router.post('/hire',          hireService);     // POST hire a service
router.get('/saved',          getSaved);        // GET  saved services
router.get('/hired',          getHired);        // GET  hired services
router.delete('/saved/:id',   removeSaved);     // DELETE remove from saved

module.exports = router;
