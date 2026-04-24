// js/app.js — Frontend Logic
// Uses fetch() to communicate with Express.js backend

// ── State ──────────────────────────────────────────────────────────────────
let allServices    = [];
let currentServiceId = null;
let draggedServiceId = null;

// ── On Page Load ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  showPage('home');
});

// ══════════════════════════════════════════════
// PAGE NAVIGATION
// ══════════════════════════════════════════════
function showPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Remove active from all nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Show selected page
  document.getElementById('page-' + page).classList.add('active');

  // Highlight correct nav link
  const pages = ['home', 'services', 'dashboard'];
  const idx = pages.indexOf(page);
  document.querySelectorAll('.nav-link')[idx]?.classList.add('active');

  // Load data for the page
  if (page === 'services')   renderServices(allServices);
  if (page === 'dashboard')  loadDashboard();
}

// ══════════════════════════════════════════════
// FETCH: Load all services from backend
// GET /api/services
// ══════════════════════════════════════════════
async function loadServices() {
  try {
    const res  = await fetch('/api/services');
    const json = await res.json();
    allServices = json.data;
    renderFeatured();
  } catch (err) {
    showToast('❌ Could not connect to server. Is it running?', 'error');
  }
}

// ══════════════════════════════════════════════
// RENDER: Featured cards on Home page
// ══════════════════════════════════════════════
function renderFeatured() {
  const featured = allServices.slice(0, 4);
  document.getElementById('featuredCards').innerHTML = featured.map(buildCard).join('');
}

// ══════════════════════════════════════════════
// RENDER: Services list page
// ══════════════════════════════════════════════
function renderServices(services) {
  document.getElementById('servicesCount').textContent =
    `Showing ${services.length} service${services.length !== 1 ? 's' : ''}`;

  const container = document.getElementById('servicesCards');
  if (services.length === 0) {
    container.innerHTML = '<p class="empty-state">No services match your filters. Try something else.</p>';
    return;
  }
  container.innerHTML = services.map(buildCard).join('');
}

// ══════════════════════════════════════════════
// BUILD: HTML for one service card
// ══════════════════════════════════════════════
function buildCard(s) {
  const stars = '★'.repeat(Math.round(s.rating)) + '☆'.repeat(5 - Math.round(s.rating));
  return `
    <div class="service-card"
      draggable="true"
      ondragstart="onDragStart(event, ${s.id})"
      ondragend="onDragEnd(event)">
      <span class="card-badge">${s.level}</span>
      <div class="card-emoji">${s.image}</div>
      <div class="card-category">${s.category}</div>
      <div class="card-title">${s.title}</div>
      <div class="card-seller">by ${s.seller}</div>
      <div class="card-rating">
        <span class="stars">${stars}</span>
        <span>${s.rating} (${s.reviews} reviews)</span>
      </div>
      <div class="card-footer">
        <div>
          <div class="card-price">$${s.price}</div>
          <div class="card-delivery">⏱ ${s.deliveryDays} day${s.deliveryDays > 1 ? 's' : ''}</div>
        </div>
        <div class="card-actions">
          <button class="btn-sm view" onclick="openModal(${s.id})">👁 View</button>
          <button class="btn-sm save" onclick="saveService(${s.id})">💾</button>
          <button class="btn-sm hire" onclick="hireService(${s.id})">✅</button>
        </div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
// SEARCH & FILTER
// Sends query params to backend GET /api/services
// ══════════════════════════════════════════════
async function applyFilters() {
  const search    = document.getElementById('searchInput').value.trim();
  const category  = document.getElementById('categoryFilter').value;
  const sort      = document.getElementById('sortFilter').value;
  const maxPrice  = document.getElementById('maxPrice').value;
  const minRating = document.getElementById('ratingFilter').value;

  // Build query string
  const params = new URLSearchParams();
  if (search)    params.append('search',    search);
  if (category && category !== 'All') params.append('category', category);
  if (sort)      params.append('sort',      sort);
  if (maxPrice)  params.append('maxPrice',  maxPrice);
  if (minRating) params.append('minRating', minRating);

  try {
    const res  = await fetch(`/api/services?${params.toString()}`);
    const json = await res.json();
    renderServices(json.data);
  } catch (err) {
    showToast('Filter error — server unavailable', 'error');
  }
}

// ══════════════════════════════════════════════
// Hero search → go to services page
// ══════════════════════════════════════════════
function heroSearch() {
  const val = document.getElementById('heroSearch').value;
  showPage('services');
  document.getElementById('searchInput').value = val;
  applyFilters();
}

// ══════════════════════════════════════════════
// Category click on Home → go to services page
// ══════════════════════════════════════════════
function filterByCategory(cat) {
  showPage('services');
  document.getElementById('categoryFilter').value = cat;
  applyFilters();
}

// ══════════════════════════════════════════════
// MODAL: Open service detail
// GET /api/services/:id
// ══════════════════════════════════════════════
async function openModal(id) {
  currentServiceId = id;
  try {
    const res  = await fetch(`/api/services/${id}`);
    const json = await res.json();
    if (!json.success) return showToast('Service not found', 'error');

    const s = json.data;
    const stars = '★'.repeat(Math.round(s.rating)) + '☆'.repeat(5 - Math.round(s.rating));

    document.getElementById('modalContent').innerHTML = `
      <div class="modal-emoji">${s.image}</div>
      <div class="modal-title">${s.title}</div>
      <div class="modal-tags">
        <span class="modal-tag">📁 ${s.category}</span>
        <span class="modal-tag">${stars} ${s.rating} (${s.reviews})</span>
        <span class="modal-tag">⏱ ${s.deliveryDays} days</span>
        <span class="modal-tag">👤 ${s.seller}</span>
        <span class="modal-tag">🏅 ${s.level}</span>
      </div>
      <p class="modal-desc">${s.description}</p>
      <div class="modal-price">$${s.price}</div>
    `;
    document.getElementById('modal').classList.add('open');
  } catch (err) {
    showToast('Could not load service details', 'error');
  }
}

function closeModal(event) {
  if (!event || event.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('open');
  }
}

// ══════════════════════════════════════════════
// API: Save a service
// POST /api/save
// ══════════════════════════════════════════════
async function saveService(id) {
  try {
    const res  = await fetch('/api/save', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ serviceId: id })
    });
    const json = await res.json();
    showToast(json.success ? '💾 Service saved!' : json.message, json.success ? 'success' : 'error');
  } catch (err) {
    showToast('Error saving service', 'error');
  }
}

// ══════════════════════════════════════════════
// API: Hire a service
// POST /api/hire
// ══════════════════════════════════════════════
async function hireService(id) {
  try {
    const res  = await fetch('/api/hire', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ serviceId: id })
    });
    const json = await res.json();
    showToast(json.success ? '✅ Service hired!' : json.message, json.success ? 'success' : 'error');
    if (json.success) closeModal();
  } catch (err) {
    showToast('Error hiring service', 'error');
  }
}

// ══════════════════════════════════════════════
// DRAG AND DROP
// ══════════════════════════════════════════════
function onDragStart(event, id) {
  draggedServiceId = id;
  event.target.classList.add('dragging');
}

function onDragEnd(event) {
  event.target.classList.remove('dragging');
  draggedServiceId = null;
}

function dropAction(event, action) {
  event.preventDefault();
  event.currentTarget.classList.remove('over');
  if (!draggedServiceId) return;
  if (action === 'save') saveService(draggedServiceId);
  if (action === 'hire') hireService(draggedServiceId);
}

// ══════════════════════════════════════════════
// DASHBOARD
// GET /api/saved  and  GET /api/hired
// ══════════════════════════════════════════════
async function loadDashboard() {
  try {
    const [savedRes, hiredRes] = await Promise.all([
      fetch('/api/saved'),
      fetch('/api/hired')
    ]);
    const savedJson = await savedRes.json();
    const hiredJson = await hiredRes.json();

    document.getElementById('savedCount').textContent = savedJson.count;
    document.getElementById('hiredCount').textContent = hiredJson.count;

    renderDashList('savedList', savedJson.data, 'saved');
    renderDashList('hiredList', hiredJson.data, 'hired');
  } catch (err) {
    showToast('Could not load dashboard', 'error');
  }
}

function renderDashList(containerId, items, type) {
  const el = document.getElementById(containerId);
  if (!items.length) {
    el.innerHTML = `<div class="empty-state">No ${type} services yet.<br>Go to Services to get started!</div>`;
    return;
  }
  el.innerHTML = items.map(s => `
    <div class="dash-item">
      <div class="dash-emoji">${s.image}</div>
      <div class="dash-info">
        <div class="dash-title">${s.title}</div>
        <div class="dash-meta">by ${s.seller} · ${s.category}</div>
        ${type === 'hired' ? `<span class="dash-status">${s.status}</span>` : ''}
      </div>
      <div class="dash-price">$${s.price}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════
// TOAST NOTIFICATION
// ══════════════════════════════════════════════
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.className = 'toast'; }, 3000);
}
