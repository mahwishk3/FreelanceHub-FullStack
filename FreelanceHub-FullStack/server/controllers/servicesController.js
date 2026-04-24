// controllers/servicesController.js
// Handles all business logic for service-related API endpoints

const db = require('../data/services');

// GET /api/services — return all services with optional filters
const getAllServices = (req, res) => {
  try {
    let result = [...db.services];
    const { search, category, minPrice, maxPrice, minRating, sort } = req.query;

    if (search) {
      result = result.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category && category !== 'All') {
      result = result.filter(s => s.category === category);
    }
    if (minPrice) result = result.filter(s => s.price >= Number(minPrice));
    if (maxPrice) result = result.filter(s => s.price <= Number(maxPrice));
    if (minRating) result = result.filter(s => s.rating >= Number(minRating));

    if (sort === 'price_asc')  result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating);

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/services/:id — return one service by ID
const getServiceById = (req, res) => {
  try {
    const service = db.services.find(s => s.id === parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/services — add a new service (bonus)
const addService = (req, res) => {
  try {
    const { title, category, price, description, seller } = req.body;
    if (!title || !category || !price) {
      return res.status(400).json({ success: false, message: 'title, category, and price are required' });
    }
    const newService = {
      id: db.services.length + 1,
      title, category,
      price: Number(price),
      rating: 5.0,
      reviews: 0,
      seller: seller || 'Anonymous',
      image: '⭐',
      description: description || 'No description provided.',
      deliveryDays: 7,
      level: 'New'
    };
    db.services.push(newService);
    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/save — save a service
const saveService = (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!serviceId) {
      return res.status(400).json({ success: false, message: 'serviceId is required' });
    }
    const service = db.services.find(s => s.id === parseInt(serviceId));
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    const alreadySaved = db.savedServices.find(s => s.id === service.id);
    if (alreadySaved) {
      return res.status(400).json({ success: false, message: 'Service already saved' });
    }
    db.savedServices.push({ ...service, savedAt: new Date().toISOString() });
    res.status(200).json({ success: true, message: 'Service saved!', data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/hire — hire a service
const hireService = (req, res) => {
  try {
    const { serviceId } = req.body;
    if (!serviceId) {
      return res.status(400).json({ success: false, message: 'serviceId is required' });
    }
    const service = db.services.find(s => s.id === parseInt(serviceId));
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    const alreadyHired = db.hiredServices.find(s => s.id === service.id);
    if (alreadyHired) {
      return res.status(400).json({ success: false, message: 'Service already hired' });
    }
    db.hiredServices.push({ ...service, hiredAt: new Date().toISOString(), status: 'In Progress' });
    res.status(200).json({ success: true, message: 'Service hired successfully!', data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/saved — get all saved services
const getSaved = (req, res) => {
  res.status(200).json({ success: true, count: db.savedServices.length, data: db.savedServices });
};

// GET /api/hired — get all hired services
const getHired = (req, res) => {
  res.status(200).json({ success: true, count: db.hiredServices.length, data: db.hiredServices });
};

// DELETE /api/saved/:id — remove from saved
const removeSaved = (req, res) => {
  const id = parseInt(req.params.id);
  db.savedServices = db.savedServices.filter(s => s.id !== id);
  res.status(200).json({ success: true, message: 'Removed from saved' });
};

module.exports = {
  getAllServices,
  getServiceById,
  addService,
  saveService,
  hireService,
  getSaved,
  getHired,
  removeSaved
};
