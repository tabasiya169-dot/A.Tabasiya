/**
 * Home Page JavaScript (index.js)
 * Leftover Food Donation Platform
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Console logging for demonstration and testing
 */

// Function to update real-time statistics on the homepage
function renderHomeStatistics() {
  const donations = getDonations();
  const requests = getRequests();
  const stats = calculateDashboardStats(donations, requests);

  console.log("[Home Page] Calculating platform statistics from LocalStorage:", stats);

  const donationsEl = document.getElementById("home-stat-donations");
  const peopleEl = document.getElementById("home-stat-people");
  const activeEl = document.getElementById("home-stat-active");
  const wasteEl = document.getElementById("home-stat-waste");

  if (donationsEl) donationsEl.textContent = stats.totalDonations;
  if (peopleEl) peopleEl.textContent = stats.peopleHelped.toLocaleString();
  if (activeEl) activeEl.textContent = stats.availableFood;
  if (wasteEl) wasteEl.textContent = stats.foodWasteReducedKg.toLocaleString() + " kg";
}

// Function to fetch and render live weather & safety advisory (Weather API)
function fetchHomeWeatherAdvisory() {
  const weatherBadge = document.getElementById("hero-weather-badge");
  const weatherContent = document.getElementById("hero-weather-content");

  if (!weatherContent) return;

  // Open-Meteo API (Latitude & Longitude for standard region)
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current_weather=true";

  console.log("[Weather API] Fetching live weather data from Open-Meteo for Food Safety advisory:", apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Weather API network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("[Weather API] Received Live Weather Data:", data);

      if (data && data.current_weather) {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        
        let safetyNote = "Normal ambient temp. Cooked food safe at room temp for up to 2 hours.";
        let badgeText = "Safe " + temp + "°C";

        if (temp > 32) {
          safetyNote = "High temperature alert (" + temp + "°C). Keep cooked donations insulated and chilled.";
          badgeText = "Warm " + temp + "°C";
        } else if (temp < 15) {
          safetyNote = "Cool weather (" + temp + "°C). Food shelf-life extended. Consume within 4 hours.";
          badgeText = "Cool " + temp + "°C";
        }

        if (weatherBadge) {
          weatherBadge.textContent = badgeText;
          weatherBadge.className = "badge-custom badge-available";
        }

        weatherContent.innerHTML = 
          '<div class="flex items-center gap-2 text-slate-800 font-semibold">' +
            '<i class="bi bi-thermometer-half text-emerald-600 text-lg"></i>' +
            '<span>Current Temp: ' + temp + '°C | Wind: ' + wind + ' km/h</span>' +
          '</div>' +
          '<div class="text-xs text-slate-600 mt-1">' + safetyNote + '</div>';
      }
    })
    .catch(function (error) {
      console.warn("[Weather API] Fallback active due to fetch error:", error);
      if (weatherBadge) weatherBadge.textContent = "Live Advisory";
      if (weatherContent) {
        weatherContent.innerHTML = 
          '<div class="text-xs text-slate-700 font-medium">' +
            '<i class="bi bi-shield-check text-emerald-600 mr-1"></i> Food Safety Rule: Consume within 2 hours of cooking or store below 5°C.' +
          '</div>';
      }
    });
}

// Function to render featured available food cards from LocalStorage
function renderFeaturedFoodCards() {
  const container = document.getElementById("featured-food-grid");
  if (!container) return;

  const donations = getDonations();
  const availableItems = [];

  for (let i = 0; i < donations.length; i++) {
    if (donations[i].status === "Available" || donations[i].status === "Pickup Requested") {
      availableItems.push(donations[i]);
    }
  }

  console.log("[Home Page] Rendering featured available food items (Count: " + availableItems.length + "):", availableItems);

  if (availableItems.length === 0) {
    container.innerHTML = 
      '<div class="col-span-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-600">' +
        '<i class="bi bi-emoji-smile text-4xl text-emerald-600 mb-2 block"></i>' +
        '<h4 class="font-bold text-lg text-slate-800">All current donations have been claimed!</h4>' +
        '<p class="text-sm mt-1">Be the first to share surplus food and help your neighborhood.</p>' +
        '<a href="donate.html" class="btn-primary-custom mt-4 text-sm inline-flex">Donate Food Now</a>' +
      '</div>';
    return;
  }

  // Show up to 3 featured cards
  let html = "";
  const maxFeatured = Math.min(availableItems.length, 3);

  for (let j = 0; j < maxFeatured; j++) {
    const item = availableItems[j];

    let badgeClass = "badge-available";
    let badgeText = "Available";
    if (item.status === "Pickup Requested") {
      badgeClass = "badge-requested";
      badgeText = "Pickup Requested";
    }

    let typeBadgeClass = "badge-veg";
    if (item.foodType === "Non-Vegetarian") {
      typeBadgeClass = "badge-nonveg";
    } else if (item.foodType === "Vegan") {
      typeBadgeClass = "badge-vegan";
    }

    html += 
      '<div class="food-card">' +
        '<div class="food-card-img-container">' +
          '<img src="' + item.imageUrl + '" alt="' + item.foodName + '" class="food-card-img" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
          '<div class="food-badge-top-left">' +
            '<span class="badge-custom ' + badgeClass + '">' + badgeText + '</span>' +
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
          '<h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1">' + item.foodName + '</h3>' +
          '<p class="text-xs text-slate-600 line-clamp-2 mb-4 flex-grow">' + item.description + '</p>' +
          '<div class="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-xs text-slate-600 border border-slate-100">' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-person-circle text-slate-400"></i>' +
              '<span class="font-medium text-slate-800">' + item.donorName + '</span>' +
            '</div>' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-geo-alt-fill text-rose-500"></i>' +
              '<span class="truncate">' + item.pickupLocation + '</span>' +
            '</div>' +
            '<div class="flex items-center gap-2">' +
              '<i class="bi bi-clock-history text-emerald-600"></i>' +
              '<span>' + item.expiryDate + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">' +
            '<a href="available.html" class="btn-primary-custom w-full text-center text-xs py-2">' +
              '<i class="bi bi-arrow-right-circle"></i> View & Request Pickup' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

// Initialise Home Page
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Home Page] Initializing Home Page scripts and DOM bindings...");
  renderHomeStatistics();
  fetchHomeWeatherAdvisory();
  renderFeaturedFoodCards();
});
