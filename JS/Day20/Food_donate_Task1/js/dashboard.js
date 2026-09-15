/**
 * Donation Dashboard Page JavaScript (dashboard.js)
 * Leftover Food Donation Platform
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Real-time KPI calculations, interactive tables (View, Accept, Complete, Delete)
 * - Weather API (Open-Meteo) and Location API (OpenStreetMap Nominatim) integration
 */

// Active table status filter
let currentTableStatusFilter = "All";

// City coordinates mapping for Weather API
const CITY_COORDINATES = {
  chennai: { lat: 13.0827, lon: 80.2707, name: "Chennai, India" },
  mumbai: { lat: 19.0760, lon: 72.8777, name: "Mumbai, India" },
  delhi: { lat: 28.6139, lon: 77.2090, name: "Delhi, India" },
  bengaluru: { lat: 12.9716, lon: 77.5946, name: "Bengaluru, India" },
  london: { lat: 51.5074, lon: -0.1278, name: "London, UK" },
  newyork: { lat: 40.7128, lon: -74.0060, name: "New York, US" }
};

// ==========================================
// KPI & METRICS ENGINE
// ==========================================

function updateDashboardMetrics() {
  const donations = getDonations();
  const requests = getRequests();
  const stats = calculateDashboardStats(donations, requests);

  console.log("[Dashboard] Updated KPI Statistics from LocalStorage:", stats);

  const totalEl = document.getElementById("kpi-total-donations");
  const availEl = document.getElementById("kpi-available-food");
  const reqEl = document.getElementById("kpi-pickup-requests");
  const compEl = document.getElementById("kpi-completed-donations");
  const peopleEl = document.getElementById("kpi-people-helped");
  const countAllEl = document.getElementById("dash-count-all");
  const reqBadge = document.getElementById("requests-badge-count");

  if (totalEl) totalEl.textContent = stats.totalDonations;
  if (availEl) availEl.textContent = stats.availableFood;
  if (reqEl) reqEl.textContent = stats.pickupRequests;
  if (compEl) compEl.textContent = stats.completedDonations;
  if (peopleEl) peopleEl.textContent = stats.peopleHelped.toLocaleString();
  if (countAllEl) countAllEl.textContent = stats.totalDonations;
  if (reqBadge) reqBadge.textContent = requests.length + " Requests";
}

// ==========================================
// MANAGEMENT TABLE 1: ALL DONATIONS
// ==========================================

function renderDonationsTable() {
  const tbody = document.getElementById("donations-table-body");
  if (!tbody) return;

  const donations = getDonations();
  const filtered = [];

  for (let i = 0; i < donations.length; i++) {
    const item = donations[i];
    if (currentTableStatusFilter === "All" || item.status === currentTableStatusFilter) {
      filtered.push(item);
    }
  }

  console.log("[Dashboard Table] Rendering donations table (Status Filter: '" + currentTableStatusFilter + "') - Count:", filtered.length);

  if (filtered.length === 0) {
    tbody.innerHTML = 
      '<tr>' +
        '<td colspan="6" class="text-center py-8 text-slate-400 text-xs font-semibold">' +
          'No food donations match the status "' + currentTableStatusFilter + '".' +
        '</td>' +
      '</tr>';
    return;
  }

  let rowsHtml = "";
  for (let j = 0; j < filtered.length; j++) {
    const item = filtered[j];

    let badgeClass = "badge-available";
    if (item.status === "Pickup Requested") badgeClass = "badge-requested";
    else if (item.status === "Accepted") badgeClass = "badge-accepted";
    else if (item.status === "Completed") badgeClass = "badge-completed";

    // Action buttons based on current lifecycle
    let actionButtons = 
      '<button type="button" class="btn-action-view text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md mr-1.5 transition-colors" data-id="' + item.id + '">' +
        '<i class="bi bi-eye"></i> View' +
      '</button>';

    if (item.status === "Pickup Requested") {
      actionButtons += 
        '<button type="button" class="btn-action-accept text-xs font-bold text-sky-700 hover:text-white bg-sky-100 hover:bg-sky-600 px-2.5 py-1 rounded-md mr-1.5 transition-colors" data-id="' + item.id + '">' +
          '<i class="bi bi-check2"></i> Accept Request' +
        '</button>';
    }

    if (item.status === "Accepted" || item.status === "Pickup Requested") {
      actionButtons += 
        '<button type="button" class="btn-action-complete text-xs font-bold text-emerald-700 hover:text-white bg-emerald-100 hover:bg-emerald-600 px-2.5 py-1 rounded-md mr-1.5 transition-colors" data-id="' + item.id + '">' +
          '<i class="bi bi-check-circle"></i> Complete' +
        '</button>';
    }

    actionButtons += 
      '<button type="button" class="btn-action-delete text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-2.5 py-1 rounded-md transition-colors" data-id="' + item.id + '">' +
        '<i class="bi bi-trash"></i> Delete' +
      '</button>';

    rowsHtml += 
      '<tr>' +
        '<td>' +
          '<div class="flex items-center gap-3">' +
            '<img src="' + item.imageUrl + '" alt="' + item.foodName + '" class="w-10 h-10 rounded-lg object-cover border border-slate-200" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
            '<div>' +
              '<div class="font-bold text-slate-900 text-sm">' + item.foodName + '</div>' +
              '<div class="text-[11px] text-slate-400 font-mono">' + item.id + '</div>' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td>' +
          '<div class="text-xs font-semibold text-slate-800">' + item.quantity + ' ' + item.quantityUnit + '</div>' +
          '<div class="text-[11px] text-slate-500">' + item.category + ' (' + item.foodType + ')</div>' +
        '</td>' +
        '<td>' +
          '<div class="text-xs font-semibold text-slate-800">' + item.donorName + '</div>' +
          '<div class="text-[11px] text-slate-500">' + item.phone + '</div>' +
        '</td>' +
        '<td>' +
          '<div class="text-xs text-slate-700 max-w-[200px] truncate">' + item.pickupLocation + '</div>' +
          '<div class="text-[11px] text-emerald-600 font-medium">' + item.expiryDate + '</div>' +
        '</td>' +
        '<td>' +
          '<span class="badge-custom ' + badgeClass + '">' + item.status + '</span>' +
        '</td>' +
        '<td class="text-right whitespace-nowrap">' +
          actionButtons +
        '</td>' +
      '</tr>';
  }

  tbody.innerHTML = rowsHtml;
  bindTableActionButtons();
}

// Function to bind table action buttons (View, Accept, Complete, Delete)
function bindTableActionButtons() {
  // View Details
  const viewBtns = document.querySelectorAll(".btn-action-view");
  for (let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      openDetailsModal(id);
    });
  }

  // Accept Request
  const acceptBtns = document.querySelectorAll(".btn-action-accept");
  for (let j = 0; j < acceptBtns.length; j++) {
    acceptBtns[j].addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      updateDonationStatus(id, "Accepted");
    });
  }

  // Complete Donation
  const completeBtns = document.querySelectorAll(".btn-action-complete");
  for (let k = 0; k < completeBtns.length; k++) {
    completeBtns[k].addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      updateDonationStatus(id, "Completed");
    });
  }

  // Delete Donation
  const deleteBtns = document.querySelectorAll(".btn-action-delete");
  for (let l = 0; l < deleteBtns.length; l++) {
    deleteBtns[l].addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      deleteDonation(id);
    });
  }
}

// Function to update donation status (e.g. to Accepted or Completed)
function updateDonationStatus(donationId, newStatus) {
  const donations = getDonations();
  let updatedName = "";

  for (let i = 0; i < donations.length; i++) {
    if (donations[i].id === donationId) {
      donations[i].status = newStatus;
      updatedName = donations[i].foodName;
      break;
    }
  }

  saveDonations(donations);
  console.log("[Dashboard Action] Updated status for '" + updatedName + "' (" + donationId + ") to '" + newStatus + "'");

  // Also update associated request status if applicable
  const requests = getRequests();
  for (let j = 0; j < requests.length; j++) {
    if (requests[j].donationId === donationId) {
      requests[j].status = newStatus;
    }
  }
  saveRequests(requests);

  showToast('Donation "' + updatedName + '" marked as ' + newStatus + '!', "success");
  updateDashboardMetrics();
  renderDonationsTable();
  renderRequestsTable();
}

// Function to delete a donation record
function deleteDonation(donationId) {
  const confirmDelete = confirm("Are you sure you want to delete this food donation record?");
  if (!confirmDelete) return;

  const donations = getDonations();
  const updated = [];

  for (let i = 0; i < donations.length; i++) {
    if (donations[i].id !== donationId) {
      updated.push(donations[i]);
    }
  }

  saveDonations(updated);
  console.log("[Dashboard Action] Deleted donation " + donationId + ". Remaining:", updated.length);

  showToast("Donation record deleted.", "info");
  updateDashboardMetrics();
  renderDonationsTable();
  renderRequestsTable();
}

// ==========================================
// MANAGEMENT TABLE 2: PICKUP REQUESTS
// ==========================================

function renderRequestsTable() {
  const tbody = document.getElementById("requests-table-body");
  if (!tbody) return;

  const requests = getRequests();
  console.log("[Dashboard Table] Rendering received pickup requests:", requests);

  if (requests.length === 0) {
    tbody.innerHTML = 
      '<tr>' +
        '<td colspan="7" class="text-center py-8 text-slate-400 text-xs font-semibold">' +
          'No pickup requests submitted yet. Browse Available Food to test request submission.' +
        '</td>' +
      '</tr>';
    return;
  }

  let html = "";
  for (let i = 0; i < requests.length; i++) {
    const req = requests[i];

    let badgeClass = "badge-requested";
    if (req.status === "Accepted") badgeClass = "badge-accepted";
    else if (req.status === "Completed") badgeClass = "badge-completed";

    html += 
      '<tr>' +
        '<td class="font-mono text-xs font-bold text-slate-700">' + req.requestId + '</td>' +
        '<td>' +
          '<div class="font-bold text-slate-900 text-xs">' + req.foodName + '</div>' +
          '<div class="text-[11px] text-slate-500 font-mono">Ref: ' + req.donationId + '</div>' +
        '</td>' +
        '<td>' +
          '<div class="font-semibold text-slate-800 text-xs">' + req.requesterName + '</div>' +
          '<div class="text-[11px] text-slate-500">' + (req.requesterOrg || "Community Member") + '</div>' +
        '</td>' +
        '<td class="text-xs font-semibold text-slate-700">' + req.requesterPhone + '</td>' +
        '<td class="text-xs text-emerald-700 font-medium">' + req.pickupTime + '</td>' +
        '<td><span class="badge-custom ' + badgeClass + '">' + req.status + '</span></td>' +
        '<td class="text-right">' +
          '<button type="button" class="btn-req-complete text-xs font-bold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 px-2.5 py-1 rounded-md transition-colors" data-id="' + req.donationId + '">' +
            '<i class="bi bi-check2-all"></i> Mark Done' +
          '</button>' +
        '</td>' +
      '</tr>';
  }

  tbody.innerHTML = html;

  // Bind mark done buttons
  const doneBtns = document.querySelectorAll(".btn-req-complete");
  for (let j = 0; j < doneBtns.length; j++) {
    doneBtns[j].addEventListener("click", function () {
      const donId = this.getAttribute("data-id");
      updateDonationStatus(donId, "Completed");
    });
  }
}

// ==========================================
// DETAILS MODAL
// ==========================================

function openDetailsModal(donationId) {
  const donations = getDonations();
  let item = null;
  for (let i = 0; i < donations.length; i++) {
    if (donations[i].id === donationId) {
      item = donations[i];
      break;
    }
  }

  if (!item) return;

  const content = document.getElementById("details-modal-content");
  if (!content) return;

  content.innerHTML = 
    '<div class="space-y-4 text-xs text-slate-700">' +
      '<img src="' + item.imageUrl + '" alt="' + item.foodName + '" class="w-full h-48 object-cover rounded-2xl border border-slate-200" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
      '<div class="flex items-center justify-between">' +
        '<h4 class="text-base font-bold text-slate-900">' + item.foodName + '</h4>' +
        '<span class="badge-custom badge-available">' + item.status + '</span>' +
      '</div>' +
      '<div class="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">' +
        '<div><strong>Category:</strong> ' + item.category + '</div>' +
        '<div><strong>Dietary Type:</strong> ' + item.foodType + '</div>' +
        '<div><strong>Quantity:</strong> ' + item.quantity + ' ' + item.quantityUnit + '</div>' +
        '<div><strong>Safe Expiry:</strong> ' + item.expiryDate + '</div>' +
      '</div>' +
      '<div class="space-y-1">' +
        '<div><strong>Donor Name:</strong> ' + item.donorName + '</div>' +
        '<div><strong>Email:</strong> ' + item.email + ' | <strong>Phone:</strong> ' + item.phone + '</div>' +
        '<div><strong>Pickup Location:</strong> ' + item.pickupLocation + '</div>' +
        '<div><strong>Prepared Time:</strong> ' + item.preparedDate + '</div>' +
        '<div><strong>Description:</strong> ' + item.description + '</div>' +
      '</div>' +
    '</div>';

  const modal = document.getElementById("details-modal");
  if (modal) modal.classList.add("show");
}

function closeDetailsModal() {
  const modal = document.getElementById("details-modal");
  if (modal) modal.classList.remove("show");
}

// ==========================================
// WEATHER API (API 5 - Open-Meteo)
// ==========================================

function fetchDashboardWeather(cityKey) {
  const city = CITY_COORDINATES[cityKey] || CITY_COORDINATES.chennai;
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + city.lat + "&longitude=" + city.lon + "&current_weather=true";

  console.log("[Weather API - Dashboard] Fetching live forecast for " + city.name + ":", apiUrl);

  fetch(apiUrl)
    .then(function (res) {
      if (!res.ok) throw new Error("Weather API error " + res.status);
      return res.json();
    })
    .then(function (data) {
      console.log("[Weather API - Dashboard Response]:", data);
      if (data && data.current_weather) {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const dir = data.current_weather.winddirection;

        const tempEl = document.getElementById("dash-weather-temp");
        const descEl = document.getElementById("dash-weather-desc");
        const windEl = document.getElementById("dash-weather-wind");
        const dirEl = document.getElementById("dash-weather-dir");
        const advEl = document.getElementById("dash-weather-advisory");

        if (tempEl) tempEl.textContent = temp + "°C";
        if (descEl) descEl.textContent = city.name + " (Live)";
        if (windEl) windEl.textContent = wind + " km/h";
        if (dirEl) dirEl.textContent = dir + "°";

        if (advEl) {
          if (temp > 30) {
            advEl.innerHTML = '<span class="text-amber-200 font-bold"><i class="bi bi-thermometer-sun"></i> Hot Climate Alert (' + temp + '°C):</span> Recommend insulated hot/cold boxes for meal transportation.';
          } else {
            advEl.innerHTML = '<span class="text-emerald-200 font-bold"><i class="bi bi-shield-check"></i> Optimal Condition (' + temp + '°C):</span> Standard 2-hour cooked food window is safe for ambient pickup.';
          }
        }
      }
    })
    .catch(function (err) {
      console.warn("[Weather API] Error fetching live weather, setting fallback:", err);
      const tempEl = document.getElementById("dash-weather-temp");
      const descEl = document.getElementById("dash-weather-desc");
      if (tempEl) tempEl.textContent = "28°C";
      if (descEl) descEl.textContent = city.name + " (Standard)";
    });
}

// ==========================================
// LOCATION API (API 4 - OpenStreetMap Nominatim)
// ==========================================

function fetchNearbyCommunityHubs() {
  const container = document.getElementById("location-hubs-container");
  if (!container) return;

  const apiUrl = "https://nominatim.openstreetmap.org/search?format=json&q=community+center+food+bank&limit=5";
  console.log("[Location API] Fetching community dropoff hubs from OpenStreetMap Nominatim:", apiUrl);

  fetch(apiUrl)
    .then(function (res) {
      if (!res.ok) throw new Error("Location API error " + res.status);
      return res.json();
    })
    .then(function (data) {
      console.log("[Location API] Received Community Locations:", data);
      renderCommunityHubs(data);
    })
    .catch(function (err) {
      console.warn("[Location API] Fetch failed, rendering fallback community centers:", err);
      renderCommunityHubs(getFallbackHubs());
    });
}

function getFallbackHubs() {
  return [
    {
      display_name: "Downtown Community Food Hub, Central Sector, Sector 4",
      lat: "13.0827",
      lon: "80.2707",
      type: "community_centre"
    },
    {
      display_name: "St. Jude Shelter & Nutrition Dropoff Point, Ring Road",
      lat: "13.0604",
      lon: "80.2496",
      type: "social_facility"
    },
    {
      display_name: "Green Hope Volunteer Distribution Center, North Block",
      lat: "13.0900",
      lon: "80.2800",
      type: "ngo_office"
    },
    {
      display_name: "Sunrise Youth Orphanage & Meal Support Center",
      lat: "13.0450",
      lon: "80.2200",
      type: "community_hall"
    }
  ];
}

function renderCommunityHubs(hubsList) {
  const container = document.getElementById("location-hubs-container");
  if (!container) return;

  if (!hubsList || hubsList.length === 0) {
    container.innerHTML = '<div class="text-xs text-slate-400 py-4 text-center">No community hubs available.</div>';
    return;
  }

  let html = "";
  for (let i = 0; i < hubsList.length; i++) {
    const hub = hubsList[i];
    const cleanName = hub.display_name ? hub.display_name.split(",").slice(0, 3).join(",") : "Community Dropoff Center";

    html += 
      '<div class="flex items-start justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">' +
        '<div class="flex items-start gap-2.5">' +
          '<div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">' +
            '<i class="bi bi-geo-alt-fill"></i>' +
          '</div>' +
          '<div>' +
            '<div class="text-xs font-bold text-slate-800 line-clamp-1">' + cleanName + '</div>' +
            '<div class="text-[10px] text-slate-400 font-mono">Coords: ' + parseFloat(hub.lat || 0).toFixed(4) + ', ' + parseFloat(hub.lon || 0).toFixed(4) + '</div>' +
          '</div>' +
        '</div>' +
        '<span class="badge-custom badge-available text-[9px]">Active Hub</span>' +
      '</div>';
  }

  container.innerHTML = html;
}

// Setup table filter pill listeners
function setupTableFilterListeners() {
  const buttons = document.querySelectorAll(".table-filter-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      currentTableStatusFilter = this.getAttribute("data-status");

      for (let j = 0; j < buttons.length; j++) {
        const btn = buttons[j];
        if (btn.getAttribute("data-status") === currentTableStatusFilter) {
          btn.className = "table-filter-btn active px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white";
        } else {
          btn.className = "table-filter-btn px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200";
        }
      }

      renderDonationsTable();
    });
  }
}

// Setup Details Modal listeners
function setupDetailsModalListeners() {
  const closeBtn = document.getElementById("btn-close-details-modal");
  const dismissBtn = document.getElementById("btn-dismiss-details-modal");
  const modal = document.getElementById("details-modal");

  if (closeBtn) closeBtn.addEventListener("click", closeDetailsModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeDetailsModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeDetailsModal();
    });
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Dashboard Page] Initializing admin & operations dashboard...");

  updateDashboardMetrics();
  renderDonationsTable();
  renderRequestsTable();
  setupTableFilterListeners();
  setupDetailsModalListeners();

  // Weather API initialization
  fetchDashboardWeather("chennai");
  const citySelect = document.getElementById("weather-city-select");
  if (citySelect) {
    citySelect.addEventListener("change", function () {
      fetchDashboardWeather(this.value);
    });
  }

  // Location API initialization
  fetchNearbyCommunityHubs();
  const reloadLocBtn = document.getElementById("btn-fetch-locations");
  if (reloadLocBtn) {
    reloadLocBtn.addEventListener("click", function () {
      fetchNearbyCommunityHubs();
      showToast("Reloading nearby community food hubs...", "info");
    });
  }

  // Refresh Dashboard Button
  const refreshBtn = document.getElementById("btn-refresh-dashboard");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      updateDashboardMetrics();
      renderDonationsTable();
      renderRequestsTable();
      fetchDashboardWeather(citySelect ? citySelect.value : "chennai");
      fetchNearbyCommunityHubs();
      showToast("Dashboard metrics and tables refreshed!", "success");
    });
  }
});
