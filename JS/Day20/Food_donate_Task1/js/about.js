/**
 * About Page JavaScript (about.js)
 * Leftover Food Donation Platform
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Console logging for demonstration and testing
 */

function initializeAboutPage() {
  console.log("[About Page] Loaded successfully. All 4-step workflow cards and API blueprints initialized.");

  // Log active APIs overview for developer inspection
  const apiArchitecture = [
    { name: "Food Details API", endpoint: "TheMealDB & Open Food Facts", role: "Ingredient & category verification" },
    { name: "Nutrition API", endpoint: "Open Food Facts Nutrition v2", role: "Macro & calorie breakdown" },
    { name: "Recipe API", endpoint: "DummyJSON Recipes & TheMealDB", role: "Leftover transformation recipes" },
    { name: "Location API", endpoint: "OpenStreetMap Nominatim", role: "Geographical pickup centers" },
    { name: "Weather API", endpoint: "Open-Meteo Forecast", role: "Real-time temperature alerts" }
  ];

  console.log("[API Architecture Blueprint]:", apiArchitecture);
}

document.addEventListener("DOMContentLoaded", function () {
  initializeAboutPage();
});
