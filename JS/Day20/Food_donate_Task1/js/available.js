/**
 * Available Food Page JavaScript (available.js)
 * Leftover Food Donation Platform
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Dynamic card rendering, search, category filters, pickup modal & LocalStorage sync
 */

// Active filter state
let currentSearchQuery = "";
let currentCategoryFilter = "All";

// Function to render available food cards dynamically
function renderAvailableFoodList() {
  const container = document.getElementById("available-food-grid");
  const countEl = document.getElementById("displayed-count");
  const countAllEl = document.getElementById("count-all");

  if (!container) return;

  const allDonations = getDonations();
  if (countAllEl) countAllEl.textContent = allDonations.length;

  // Filter items using search query & category
  const filtered = [];
  for (let i = 0; i < allDonations.length; i++) {
    const item = allDonations[i];
    const q = currentSearchQuery.toLowerCase();

    const nameMatch = item.foodName ? item.foodName.toLowerCase().includes(q) : false;
    const locMatch = item.pickupLocation ? item.pickupLocation.toLowerCase().includes(q) : false;
    const donorMatch = item.donorName ? item.donorName.toLowerCase().includes(q) : false;
    const descMatch = item.description ? item.description.toLowerCase().includes(q) : false;

    const matchesSearch = q === "" || nameMatch || locMatch || donorMatch || descMatch;

    let matchesCategory = false;
    if (currentCategoryFilter === "All") {
      matchesCategory = true;
    } else if (item.category === currentCategoryFilter || item.foodType === currentCategoryFilter) {
      matchesCategory = true;
    }

    if (matchesSearch && matchesCategory) {
      filtered.push(item);
    }
  }

  console.log("[Available Food Page] Rendered items with filters (Query: '" + currentSearchQuery + "', Category: '" + currentCategoryFilter + "') - Count:", filtered.length);

  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = 
      '<div class="col-span-full bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 shadow-sm">' +
        '<div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-3xl mx-auto mb-3">' +
          '<i class="bi bi-search"></i>' +
        '</div>' +
        '<h3 class="text-lg font-bold text-slate-900 mb-1">No food listings match your criteria</h3>' +
        '<p class="text-xs text-slate-500 max-w-md mx-auto mb-4">Try clearing your search query or selecting a different food category.</p>' +
        '<button type="button" id="btn-reset-filters" class="btn-secondary-custom text-xs">' +
          '<i class="bi bi-arrow-counterclockwise"></i> Reset All Filters' +
        '</button>' +
      '</div>';

    const resetBtn = document.getElementById("btn-reset-filters");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        currentSearchQuery = "";
        currentCategoryFilter = "All";
        const searchInput = document.getElementById("food-search-input");
        if (searchInput) searchInput.value = "";
        updateFilterButtonStyles();
        renderAvailableFoodList();
      });
    }
    return;
  }

  let html = "";
  for (let j = 0; j < filtered.length; j++) {
    const item = filtered[j];

    let badgeClass = "badge-available";
    let statusText = "Available";
    let isRequestable = true;

    if (item.status === "Pickup Requested") {
      badgeClass = "badge-requested";
      statusText = "Pickup Requested";
      isRequestable = false;
    } else if (item.status === "Accepted") {
      badgeClass = "badge-accepted";
      statusText = "Request Accepted";
      isRequestable = false;
    } else if (item.status === "Completed") {
      badgeClass = "badge-completed";
      statusText = "Donation Completed";
      isRequestable = false;
    }

    let typeBadgeClass = "badge-veg";
    if (item.foodType === "Non-Vegetarian") {
      typeBadgeClass = "badge-nonveg";
    } else if (item.foodType === "Vegan") {
      typeBadgeClass = "badge-vegan";
    }

    let actionButtonHtml = "";
    if (isRequestable) {
      actionButtonHtml = 
        '<button type="button" class="btn-primary-custom w-full text-center text-xs py-2.5 request-pickup-btn" data-id="' + item.id + '">' +
          '<i class="bi bi-hand-index-thumb-fill"></i> Request Pickup' +
        '</button>';
    } else {
      actionButtonHtml = 
        '<button type="button" class="w-full text-center text-xs py-2.5 rounded-xl font-bold bg-slate-100 text-slate-400 cursor-not-allowed" disabled>' +
          '<i class="bi bi-lock-fill"></i> ' + statusText +
        '</button>';
    }

    html += 
      '<div class="food-card">' +
        '<div class="food-card-img-container">' +
          '<img src="' + item.imageUrl + '" alt="' + item.foodName + '" class="food-card-img" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
          '<div class="food-badge-top-left">' +
            '<span class="badge-custom ' + badgeClass + '">' + statusText + '</span>' +
          '</div>' +
          '<div class="food-badge-top-right">' +
            '<span class="badge-custom ' + typeBadgeClass + '">' + item.foodType + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="food-card-body">' +
          '<div class="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">' +
            '<span><i class="bi bi-tag-fill text-emerald-600 mr-1"></i>' + item.category + '</span>' +
            '<span><i class="bi bi-pie-chart-fill text-amber-500 mr-1"></i>' + item.quantity + ' ' + item.quantityUnit + '</span>' +
          '</div>' +
          '<h3 class="text-lg font-bold text-slate-900 mb-2">' + item.foodName + '</h3>' +
          '<p class="text-xs text-slate-600 line-clamp-2 mb-4 flex-grow">' + item.description + '</p>' +
          '<div class="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-xs text-slate-600 border border-slate-100">' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-person-circle text-slate-400"></i>' +
              '<span class="font-medium text-slate-800">' + item.donorName + '</span>' +
              '<span class="text-slate-400 text-[11px]">(' + (item.phone || "Contact Verified") + ')</span>' +
            '</div>' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-geo-alt-fill text-rose-500"></i>' +
              '<span class="truncate">' + item.pickupLocation + '</span>' +
            '</div>' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-clock-history text-emerald-600"></i>' +
              '<span>' + item.expiryDate + ' (Prep: ' + item.preparedDate + ')</span>' +
            '</div>' +
          '</div>' +
          '<div class="mt-auto pt-2 border-t border-slate-100">' +
            actionButtonHtml +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;

  // Bind click handlers to all "Request Pickup" buttons
  bindPickupButtons();
}

// Function to bind pickup modal triggers
function bindPickupButtons() {
  const buttons = document.querySelectorAll(".request-pickup-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const donationId = this.getAttribute("data-id");
      openPickupModal(donationId);
    });
  }
}

// Function to open the Pickup Request Modal
function openPickupModal(donationId) {
  const donations = getDonations();
  let selectedItem = null;

  for (let i = 0; i < donations.length; i++) {
    if (donations[i].id === donationId) {
      selectedItem = donations[i];
      break;
    }
  }

  if (!selectedItem) {
    showToast("Selected food donation not found.", "danger");
    return;
  }

  console.log("[Pickup Modal] Opening pickup modal for donation:", selectedItem);

  // Populate modal summary details
  document.getElementById("modal-donation-id").value = selectedItem.id;
  document.getElementById("modal-food-name").textContent = selectedItem.foodName;
  document.getElementById("modal-food-qty").innerHTML = '<i class="bi bi-pie-chart-fill mr-1"></i>' + selectedItem.quantity + ' ' + selectedItem.quantityUnit + ' (' + selectedItem.foodType + ')';
  document.getElementById("modal-food-donor").innerHTML = '<i class="bi bi-person mr-1"></i>Donor: ' + selectedItem.donorName;
  document.getElementById("modal-food-location").innerHTML = '<i class="bi bi-geo-alt-fill text-rose-500 mr-1"></i>' + selectedItem.pickupLocation;

  // Reset form inputs & errors
  document.getElementById("pickup-request-form").reset();
  const errName = document.getElementById("err-modal-requesterName");
  const errPhone = document.getElementById("err-modal-requesterPhone");
  if (errName) errName.classList.add("hidden");
  if (errPhone) errPhone.classList.add("hidden");

  // Show Modal
  const modal = document.getElementById("pickup-modal");
  if (modal) modal.classList.add("show");
}

// Function to close the Pickup Request Modal
function closePickupModal() {
  const modal = document.getElementById("pickup-modal");
  if (modal) modal.classList.remove("show");
}

// Function to handle pickup request submission
function handlePickupSubmit(event) {
  event.preventDefault();

  const donationId = document.getElementById("modal-donation-id").value;
  const requesterName = document.getElementById("requesterName").value;
  const requesterPhone = document.getElementById("requesterPhone").value;
  const pickupTime = document.getElementById("pickupTime").value;
  const requesterMessage = document.getElementById("requesterMessage").value;

  // Validate inputs
  let isValid = true;
  const errName = document.getElementById("err-modal-requesterName");
  const errPhone = document.getElementById("err-modal-requesterPhone");

  if (!requesterName || requesterName.trim() === "") {
    if (errName) {
      errName.textContent = "Please enter your name or organization.";
      errName.classList.remove("hidden");
    }
    isValid = false;
  } else {
    if (errName) errName.classList.add("hidden");
  }

  if (!requesterPhone || requesterPhone.trim().length < 8) {
    if (errPhone) {
      errPhone.textContent = "Please enter a valid contact phone number.";
      errPhone.classList.remove("hidden");
    }
    isValid = false;
  } else {
    if (errPhone) errPhone.classList.add("hidden");
  }

  if (!isValid) return;

  const donations = getDonations();
  let updatedFoodName = "Food Item";

  for (let i = 0; i < donations.length; i++) {
    if (donations[i].id === donationId) {
      donations[i].status = "Pickup Requested";
      updatedFoodName = donations[i].foodName;
      break;
    }
  }

  // Create new pickup request record
  const newRequest = {
    requestId: "REQ-" + Date.now(),
    donationId: donationId,
    foodName: updatedFoodName,
    requesterName: requesterName.trim(),
    requesterPhone: requesterPhone.trim(),
    pickupTime: pickupTime,
    message: requesterMessage ? requesterMessage.trim() : "Standard pickup coordination.",
    status: "Pending",
    requestedAt: new Date().toISOString()
  };

  console.log("[Pickup Request] Created pickup request object:", newRequest);

  // Save updated donations and new request to LocalStorage
  saveDonations(donations);
  const requests = getRequests();
  requests.push(newRequest);
  saveRequests(requests);

  console.log("[LocalStorage] Pickup requests updated in LocalStorage:", requests);

  // Close modal
  closePickupModal();

  // Show status notice banner & toast
  const noticeBanner = document.getElementById("status-notice-banner");
  const noticeText = document.getElementById("status-notice-text");
  if (noticeBanner && noticeText) {
    noticeText.innerHTML = 'Pickup request sent for <strong>"' + updatedFoodName + '"</strong>! The donor has been notified to coordinate handover.';
    noticeBanner.classList.remove("hidden");
  }

  showToast("Pickup request submitted successfully!", "success");

  // Re-render available food cards with updated status
  renderAvailableFoodList();
}

// Function to update filter button styles
function updateFilterButtonStyles() {
  const buttons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const cat = btn.getAttribute("data-category");
    if (cat === currentCategoryFilter) {
      btn.className = "filter-btn active px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors bg-emerald-600 text-white";
    } else {
      btn.className = "filter-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200";
    }
  }
}

// Setup search & filter event listeners
function setupFilterListeners() {
  const searchInput = document.getElementById("food-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearchQuery = this.value;
      renderAvailableFoodList();
    });
  }

  const buttons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      currentCategoryFilter = this.getAttribute("data-category");
      updateFilterButtonStyles();
      renderAvailableFoodList();
    });
  }
}

// Setup Modal event listeners
function setupModalListeners() {
  const closeBtn = document.getElementById("btn-close-modal");
  const cancelBtn = document.getElementById("btn-cancel-modal");
  const form = document.getElementById("pickup-request-form");
  const modal = document.getElementById("pickup-modal");

  if (closeBtn) closeBtn.addEventListener("click", closePickupModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closePickupModal);
  if (form) form.addEventListener("submit", handlePickupSubmit);

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closePickupModal();
      }
    });
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Available Food Page] Initializing available food marketplace...");
  setupFilterListeners();
  setupModalListeners();
  renderAvailableFoodList();
});
