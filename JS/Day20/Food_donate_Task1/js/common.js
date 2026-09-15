/**
 * Leftover Food Donation Platform - Common Utilities & Shared LocalStorage Store
 * 
 * Rules Adhered to:
 * - Only const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - DOM manipulation & LocalStorage integration
 */

// Key constants for LocalStorage
const STORAGE_KEYS = {
  DONATIONS: "food_donations_data",
  REQUESTS: "food_pickup_requests",
  SETTINGS: "platform_user_settings"
};

// Seed realistic starter data if LocalStorage is empty on first run
function initializeSampleData() {
  const existingDonations = localStorage.getItem(STORAGE_KEYS.DONATIONS);

  if (!existingDonations || existingDonations === "[]") {
    console.log("[LocalStorage] Initializing platform with realistic starter donations and requests...");

    const sampleDonations = [
      {
        id: "DON-1001",
        donorName: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        phone: "+91 98765 43210",
        foodName: "Steamed Basmati Rice & Tadka Dal",
        category: "Cooked Meals",
        quantity: 8,
        quantityUnit: "Servings",
        foodType: "Vegetarian",
        preparedDate: "Today, 1:00 PM",
        expiryDate: "Safe within 5 hours (Keep covered)",
        pickupLocation: "Greenwood Community Center, Sector 4",
        description: "Freshly cooked lunch surplus from a small community gathering. Hot, packed in hygienic aluminum containers.",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        status: "Available",
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "DON-1002",
        donorName: "Grand Central Bakery",
        email: "contact@grandcentralbakery.com",
        phone: "+91 98111 22334",
        foodName: "Whole Wheat Chapatis & Dinner Rolls",
        category: "Bakery",
        quantity: 25,
        quantityUnit: "Pieces",
        foodType: "Vegetarian",
        preparedDate: "Today, 3:30 PM",
        expiryDate: "Safe for 24 hours",
        pickupLocation: "Central Market Gate 2, Metro Station",
        description: "Freshly baked surplus artisan dinner rolls and soft whole wheat rotis, sealed in food-grade kraft bags.",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        status: "Available",
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: "DON-1003",
        donorName: "Rohit & Meera Verma",
        email: "rohit.verma@example.com",
        phone: "+91 97234 56789",
        foodName: "Mixed Vegetable Pulao & Raita",
        category: "Cooked Meals",
        quantity: 6,
        quantityUnit: "Servings",
        foodType: "Vegetarian",
        preparedDate: "Today, 2:15 PM",
        expiryDate: "Safe within 4 hours",
        pickupLocation: "Sunshine Apartments Clubhouse, Block B",
        description: "Surplus home-cooked mild veg pulao made with carrots, peas, paneer and fragrant spices.",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
        status: "Pickup Requested",
        createdAt: new Date(Date.now() - 10800000).toISOString()
      },
      {
        id: "DON-1004",
        donorName: "Green Earth Farm Market",
        email: "info@greenearthmarket.org",
        phone: "+91 99887 66554",
        foodName: "Fresh Seasonal Fruit Crates (Apples & Oranges)",
        category: "Fresh Produce",
        quantity: 12,
        quantityUnit: "Kg",
        foodType: "Vegan",
        preparedDate: "Today, 10:00 AM",
        expiryDate: "Best within 3 days",
        pickupLocation: "Farmers Plaza Stand #14, North Road",
        description: "Crisp and juicy seasonal fruits from morning harvest, ideal for shelter homes and childcare centers.",
        imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
        status: "Available",
        createdAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: "DON-1005",
        donorName: "Sunrise Banquet Hall",
        email: "events@sunrisebanquets.com",
        phone: "+91 98450 11223",
        foodName: "Paneer Butter Masala with Laccha Paratha",
        category: "Cooked Meals",
        quantity: 15,
        quantityUnit: "Servings",
        foodType: "Vegetarian",
        preparedDate: "Today, 12:45 PM",
        expiryDate: "Safe within 4 hours",
        pickupLocation: "Sunrise Banquet Hall Rear Gate, Ring Road",
        description: "Untouched surplus from daytime seminar banquet. Maintained at food safety standards.",
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
        status: "Accepted",
        createdAt: new Date(Date.now() - 18000000).toISOString()
      },
      {
        id: "DON-1006",
        donorName: "Kavita Nair",
        email: "kavita.nair@example.com",
        phone: "+91 98760 54321",
        foodName: "Homemade Idli & Sambar (Hot)",
        category: "Cooked Meals",
        quantity: 20,
        quantityUnit: "Pieces",
        foodType: "Vegan",
        preparedDate: "Today, 8:00 AM",
        expiryDate: "Delivered & Consumed",
        pickupLocation: "Lake View Housing Society, Tower 3",
        description: "Soft steamed idlis with piping hot lentil vegetable sambar. Donated and collected by Hope Shelter.",
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
        status: "Completed",
        createdAt: new Date(Date.now() - 28800000).toISOString()
      }
    ];

    const sampleRequests = [
      {
        requestId: "REQ-2001",
        donationId: "DON-1003",
        foodName: "Mixed Vegetable Pulao & Raita",
        requesterName: "Prakash Kumar (Volunteer)",
        requesterPhone: "+91 98222 33445",
        requesterOrg: "City Youth Care NGO",
        pickupTime: "Today at 5:00 PM",
        message: "We have 6 evening students at our community center who will gladly take this delicious hot meal.",
        status: "Pending",
        requestedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        requestId: "REQ-2002",
        donationId: "DON-1005",
        foodName: "Paneer Butter Masala with Laccha Paratha",
        requesterName: "Sister Teresa Care Home",
        requesterPhone: "+91 98333 44556",
        requesterOrg: "Hope Shelter Foundation",
        pickupTime: "Today at 3:30 PM",
        message: "Our shelter vehicle is on the way to collect the donation. Thank you for supporting us!",
        status: "Accepted",
        requestedAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(sampleDonations));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(sampleRequests));
  }
}

// Function to fetch all donations from LocalStorage
function getDonations() {
  initializeSampleData();
  const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
  try {
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading donations from LocalStorage:", err);
    return [];
  }
}

// Function to save donations list to LocalStorage
function saveDonations(donationsList) {
  try {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donationsList));
    console.log("[LocalStorage] Saved donations updated successfully:", donationsList);
    return true;
  } catch (err) {
    console.error("Error saving donations to LocalStorage:", err);
    return false;
  }
}

// Function to fetch all pickup requests from LocalStorage
function getRequests() {
  initializeSampleData();
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  try {
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading requests from LocalStorage:", err);
    return [];
  }
}

// Function to save pickup requests to LocalStorage
function saveRequests(requestsList) {
  try {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requestsList));
    console.log("[LocalStorage] Saved pickup requests updated successfully:", requestsList);
    return true;
  } catch (err) {
    console.error("Error saving requests to LocalStorage:", err);
    return false;
  }
}

// Function to validate food donation form input fields
function validateDonationForm(formData) {
  const errors = {};

  if (!formData.donorName || formData.donorName.trim() === "") {
    errors.donorName = "Donor name is required.";
  }

  if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
    errors.email = "A valid email address is required.";
  }

  if (!formData.phone || formData.phone.trim().length < 8) {
    errors.phone = "A valid contact phone number is required (min 8 digits).";
  }

  if (!formData.foodName || formData.foodName.trim() === "") {
    errors.foodName = "Food name is required.";
  }

  if (!formData.category || formData.category.trim() === "") {
    errors.category = "Please select a food category.";
  }

  if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
    errors.quantity = "Please enter a valid quantity greater than zero.";
  }

  if (!formData.preparedDate || formData.preparedDate.trim() === "") {
    errors.preparedDate = "Preparation date and time is required.";
  }

  if (!formData.pickupLocation || formData.pickupLocation.trim() === "") {
    errors.pickupLocation = "Pickup location is required.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid: isValid,
    errors: errors
  };
}

// Function to create a clean, standardized donation object with unique ID & timestamp
function createDonationObject(formData) {
  const id = "DON-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  const now = new Date().toISOString();

  let defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
  if (formData.category === "Cooked Meals") {
    defaultImage = "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80";
  } else if (formData.category === "Bakery") {
    defaultImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  } else if (formData.category === "Fresh Produce") {
    defaultImage = "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80";
  } else if (formData.category === "Grains & Cereals") {
    defaultImage = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80";
  }

  return {
    id: id,
    donorName: formData.donorName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    foodName: formData.foodName.trim(),
    category: formData.category,
    quantity: parseFloat(formData.quantity),
    quantityUnit: formData.quantityUnit || "Servings",
    foodType: formData.foodType || "Vegetarian",
    preparedDate: formData.preparedDate,
    expiryDate: formData.expiryDate || "Within 6 hours",
    pickupLocation: formData.pickupLocation.trim(),
    description: formData.description ? formData.description.trim() : "Safe leftover food packed with care.",
    imageUrl: formData.imageUrl && formData.imageUrl.trim() !== "" ? formData.imageUrl.trim() : defaultImage,
    status: "Available",
    createdAt: now
  };
}

// Function to calculate aggregate stats for dashboard & homepage
function calculateDashboardStats(donationsList, requestsList) {
  const donations = Array.isArray(donationsList) ? donationsList : [];
  const requests = Array.isArray(requestsList) ? requestsList : [];

  let totalDonations = donations.length;
  let availableFood = 0;
  let pickupRequested = 0;
  let acceptedDonations = 0;
  let completedDonations = 0;
  let totalQuantity = 0;

  for (let i = 0; i < donations.length; i++) {
    const item = donations[i];
    totalQuantity += parseFloat(item.quantity) || 0;

    if (item.status === "Available") {
      availableFood += 1;
    } else if (item.status === "Pickup Requested") {
      pickupRequested += 1;
    } else if (item.status === "Accepted") {
      acceptedDonations += 1;
    } else if (item.status === "Completed") {
      completedDonations += 1;
    }
  }

  const peopleHelped = (completedDonations * 4) + (requests.length * 3) + 24;
  const foodWasteReducedKg = Math.round(totalQuantity * 1.5 + 45);

  return {
    totalDonations: totalDonations,
    availableFood: availableFood,
    pickupRequests: requests.length,
    acceptedDonations: acceptedDonations,
    completedDonations: completedDonations,
    peopleHelped: peopleHelped,
    foodWasteReducedKg: foodWasteReducedKg
  };
}

// Function to show toast notification
function showToast(message, type) {
  let toastContainer = document.getElementById("toast-container");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const toastType = type || "success";
  toast.className = "toast-custom toast-" + toastType;

  let iconHtml = '<i class="bi bi-check-circle-fill text-emerald-600 text-xl"></i>';
  if (toastType === "warning") {
    iconHtml = '<i class="bi bi-exclamation-triangle-fill text-amber-500 text-xl"></i>';
  } else if (toastType === "danger") {
    iconHtml = '<i class="bi bi-x-circle-fill text-rose-500 text-xl"></i>';
  } else if (toastType === "info") {
    iconHtml = '<i class="bi bi-info-circle-fill text-blue-500 text-xl"></i>';
  }

  toast.innerHTML = 
    '<div class="flex items-center gap-3">' +
      iconHtml +
      '<div class="text-sm font-semibold text-slate-800">' + message + '</div>' +
    '</div>' +
    '<button type="button" class="text-slate-400 hover:text-slate-700 ml-2" onclick="this.parentElement.remove()">' +
      '<i class="bi bi-x-lg"></i>' +
    '</button>';

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(function () {
    toast.classList.add("show");
  }, 50);

  // Auto remove after 4 seconds
  setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 400);
  }, 4000);
}

// Highlight current page in navbar
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link-custom");

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    const href = link.getAttribute("href");

    if (currentPath.endsWith(href) || (currentPath.endsWith("/") && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}

// Setup Mobile Navigation Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", function () {
      const isHidden = menu.classList.contains("hidden");
      if (isHidden) {
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    });
  }
}

// Helper to format date strings cleanly
function formatDate(dateStr) {
  if (!dateStr) return "Just now";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return dateStr;
  }
}

// DOM Ready initialization
document.addEventListener("DOMContentLoaded", function () {
  initializeSampleData();
  highlightActiveNav();
  setupMobileMenu();
});
