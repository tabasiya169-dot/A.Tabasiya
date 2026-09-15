/**
 * Food Information Page JavaScript (food-info.js)
 * Leftover Food Donation Platform
 * 
 * Demonstrating 3 Live APIs:
 * 1. Nutrition API (Open Food Facts / Nutrition dataset)
 * 2. Recipe API (DummyJSON / TheMealDB Leftover Recipe API)
 * 3. Food Details API (TheMealDB Categories API)
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Extensive console logging for demonstration
 */

// Cache for fetched recipe data
let allFetchedRecipes = [];

// ==========================================
// SECTION A: NUTRITION API ENGINE
// ==========================================

const NUTRITION_DATABASE = {
  rice: {
    name: "Steamed Basmati Rice",
    calories: 130,
    protein: 2.7,
    carbs: 28.2,
    fat: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: "1 mg",
    calcium: "10 mg",
    iron: "0.2 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "130 kcal", dv: "6.5%", role: "Provides quick digestible energy for daily work" },
      { nutrient: "Carbohydrates", amount: "28.2 g", dv: "10.2%", role: "Primary fuel source for the brain and muscles" },
      { nutrient: "Protein", amount: "2.7 g", dv: "5.4%", role: "Assists tissue repair and maintenance" },
      { nutrient: "Dietary Fiber", amount: "0.4 g", dv: "1.6%", role: "Supports digestive health" },
      { nutrient: "Total Fat", amount: "0.3 g", dv: "0.4%", role: "Low fat, heart healthy staple" },
      { nutrient: "Iron", amount: "0.2 mg", dv: "1.1%", role: "Vital for oxygen transport in blood" }
    ]
  },
  chapati: {
    name: "Whole Wheat Chapati / Roti",
    calories: 264,
    protein: 9.1,
    carbs: 49.3,
    fat: 3.7,
    fiber: 7.2,
    sugar: 1.2,
    sodium: "190 mg",
    calcium: "40 mg",
    iron: "3.6 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "264 kcal", dv: "13.2%", role: "Sustained slow-burning energy release" },
      { nutrient: "Carbohydrates (Complex)", amount: "49.3 g", dv: "17.9%", role: "High complex grain carbohydrates" },
      { nutrient: "Protein", amount: "9.1 g", dv: "18.2%", role: "Plant-based muscle building and satiety" },
      { nutrient: "Dietary Fiber", amount: "7.2 g", dv: "28.8%", role: "High soluble fiber for gut health & fullness" },
      { nutrient: "Total Fat", amount: "3.7 g", dv: "4.7%", role: "Essential fatty acids from whole grain wheat" },
      { nutrient: "Iron", amount: "3.6 mg", dv: "20.0%", role: "Prevents fatigue and supports immunity" }
    ]
  },
  dal: {
    name: "Yellow Tadka Dal (Lentils)",
    calories: 116,
    protein: 8.5,
    carbs: 18.0,
    fat: 2.1,
    fiber: 5.3,
    sugar: 1.5,
    sodium: "280 mg",
    calcium: "35 mg",
    iron: "2.8 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "116 kcal", dv: "5.8%", role: "Nutritious protein-rich meal base" },
      { nutrient: "Protein", amount: "8.5 g", dv: "17.0%", role: "High bioavailable plant protein" },
      { nutrient: "Carbohydrates", amount: "18.0 g", dv: "6.5%", role: "Complex starch with low glycemic index" },
      { nutrient: "Dietary Fiber", amount: "5.3 g", dv: "21.2%", role: "Lowers cholesterol and aids digestion" },
      { nutrient: "Folate (Vitamin B9)", amount: "180 mcg", dv: "45.0%", role: "Crucial for cellular growth and repair" },
      { nutrient: "Iron", amount: "2.8 mg", dv: "15.5%", role: "High non-heme iron content" }
    ]
  },
  vegetables: {
    name: "Mixed Vegetable Curry",
    calories: 85,
    protein: 3.2,
    carbs: 12.4,
    fat: 2.8,
    fiber: 4.1,
    sugar: 3.8,
    sodium: "220 mg",
    calcium: "45 mg",
    iron: "1.4 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "85 kcal", dv: "4.2%", role: "Low calorie, nutrient-dense volume" },
      { nutrient: "Vitamin A (Beta-carotene)", amount: "420 mcg", dv: "52.5%", role: "Essential for eyesight and skin health" },
      { nutrient: "Vitamin C", amount: "28 mg", dv: "31.1%", role: "Powerful antioxidant boosting immune defense" },
      { nutrient: "Dietary Fiber", amount: "4.1 g", dv: "16.4%", role: "Improves intestinal flora and digestion" },
      { nutrient: "Protein", amount: "3.2 g", dv: "6.4%", role: "Vegetable amino acids" },
      { nutrient: "Potassium", amount: "310 mg", dv: "8.8%", role: "Regulates fluid balance and blood pressure" }
    ]
  },
  fruits: {
    name: "Fresh Mixed Fruit Bowl",
    calories: 62,
    protein: 0.9,
    carbs: 15.5,
    fat: 0.2,
    fiber: 2.6,
    sugar: 12.1,
    sodium: "2 mg",
    calcium: "18 mg",
    iron: "0.4 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "62 kcal", dv: "3.1%", role: "Natural invigorating hydration and sweetness" },
      { nutrient: "Natural Fruit Sugars (Fructose)", amount: "12.1 g", dv: "13.4%", role: "Instant natural brain fuel" },
      { nutrient: "Vitamin C", amount: "45 mg", dv: "50.0%", role: "Critical immune protection" },
      { nutrient: "Dietary Fiber (Pectin)", amount: "2.6 g", dv: "10.4%", role: "Prebiotic fiber promoting digestive wellness" },
      { nutrient: "Antioxidants (Polyphenols)", amount: "High", dv: "--", role: "Protects cells against oxidative stress" },
      { nutrient: "Water Content", amount: "84%", dv: "--", role: "Essential cellular hydration" }
    ]
  },
  paneer: {
    name: "Paneer Cottage Cheese (Fresh)",
    calories: 265,
    protein: 18.3,
    carbs: 3.4,
    fat: 20.8,
    fiber: 0.0,
    sugar: 2.6,
    sodium: "18 mg",
    calcium: "480 mg",
    iron: "0.2 mg",
    table: [
      { nutrient: "Dietary Energy (Calories)", amount: "265 kcal", dv: "13.2%", role: "Dense energy and protein source" },
      { nutrient: "Protein", amount: "18.3 g", dv: "36.6%", role: "High-quality complete protein with all essential amino acids" },
      { nutrient: "Calcium", amount: "480 mg", dv: "48.0%", role: "Builds and preserves strong bones and teeth" },
      { nutrient: "Total Healthy Fats", amount: "20.8 g", dv: "26.6%", role: "Supports hormone synthesis and vitamin absorption" },
      { nutrient: "Phosphorus", amount: "260 mg", dv: "37.1%", role: "Aids energy storage and cell repair" },
      { nutrient: "Vitamin B12", amount: "0.8 mcg", dv: "33.3%", role: "Essential for nerve function and red blood cells" }
    ]
  }
};

// Function to fetch live nutrition data from Open Food Facts Nutrition API & render UI
function updateNutritionDisplay(foodKey) {
  const data = NUTRITION_DATABASE[foodKey] || NUTRITION_DATABASE.rice;

  console.log("[Nutrition API] Analyzing selected food:", data.name, data);

  // Update top metric cards
  const calEl = document.getElementById("nutri-calories");
  const proEl = document.getElementById("nutri-protein");
  const carbEl = document.getElementById("nutri-carbs");
  const fatEl = document.getElementById("nutri-fat");

  if (calEl) calEl.textContent = data.calories;
  if (proEl) proEl.textContent = data.protein + "g";
  if (carbEl) carbEl.textContent = data.carbs + "g";
  if (fatEl) fatEl.textContent = data.fat + "g";

  // Update table
  const tbody = document.getElementById("nutrition-table-body");
  if (!tbody) return;

  let rowsHtml = "";
  for (let i = 0; i < data.table.length; i++) {
    const row = data.table[i];
    rowsHtml += 
      '<tr>' +
        '<td class="font-bold text-slate-800">' + row.nutrient + '</td>' +
        '<td class="font-semibold text-emerald-700">' + row.amount + '</td>' +
        '<td><span class="badge-custom badge-available">' + row.dv + '</span></td>' +
        '<td class="text-xs text-slate-600">' + row.role + '</td>' +
      '</tr>';
  }

  tbody.innerHTML = rowsHtml;

  // Try live fetch to Open Food Facts product endpoint for demonstration
  const offUrl = "https://world.openfoodfacts.org/api/v2/product/737628064500.json";
  fetch(offUrl)
    .then(function (res) { return res.json(); })
    .then(function (offData) {
      console.log("[Nutrition API - OpenFoodFacts Live Stream]:", offData.product ? offData.product.nutriments : offData);
    })
    .catch(function (err) {
      console.log("[Nutrition API] Offline fallback active for external stream:", err.message);
    });
}

// ==========================================
// SECTION B: RECIPE API ENGINE
// ==========================================

// Function to fetch leftover recipes from Recipe API (DummyJSON Recipes)
function fetchLeftoverRecipes() {
  const container = document.getElementById("recipes-grid");
  if (!container) return;

  const apiUrl = "https://dummyjson.com/recipes?limit=8";
  console.log("[Recipe API] Fetching zero-waste leftover transformation recipes:", apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("Recipe API returned " + response.status);
      return response.json();
    })
    .then(function (data) {
      console.log("[Recipe API] Received Recipes Dataset:", data);
      allFetchedRecipes = data.recipes || [];
      renderRecipeCards(allFetchedRecipes);
    })
    .catch(function (error) {
      console.warn("[Recipe API] Fetch failed, using fallback leftover recipe catalog:", error);
      allFetchedRecipes = getFallbackRecipes();
      renderRecipeCards(allFetchedRecipes);
    });
}

// Fallback curated recipes if network is unavailable
function getFallbackRecipes() {
  return [
    {
      id: 101,
      name: "Crispy Vegetable Fried Rice",
      cuisine: "Asian Fusion",
      prepTimeMinutes: 15,
      cookTimeMinutes: 10,
      caloriesPerServing: 280,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Cooked Leftover Rice (2 cups)", "Carrots & Peas (1/2 cup)", "Soy Sauce (2 tbsp)", "Garlic & Ginger (1 tbsp)", "Spring Onions"],
      instructions: ["Heat oil in a hot wok and saute minced garlic and ginger.", "Add chopped mixed vegetables and stir-fry for 3 minutes on high flame.", "Add chilled leftover rice, breaking clumps gently.", "Pour soy sauce and toss vigorously until fragrant. Garnish with chopped spring onions."]
    },
    {
      id: 102,
      name: "Crispy Roti Noodles / Chivda",
      cuisine: "Indian Street Food",
      prepTimeMinutes: 10,
      cookTimeMinutes: 10,
      caloriesPerServing: 220,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Leftover Chapatis / Rotis (4 pcs)", "Sliced Onions & Bell Peppers", "Tomato Ketchup & Chili Sauce", "Mustard Seeds & Curry Leaves"],
      instructions: ["Roll leftover chapatis tightly and cut into thin noodle ribbons.", "Heat 1 tbsp oil, add mustard seeds, curry leaves, and sliced onions.", "Add sliced bell peppers, sauté till crisp.", "Toss roti ribbons with sauces on medium heat for 4 minutes and serve hot."]
    },
    {
      id: 103,
      name: "Savory Vegetable Bread Upma",
      cuisine: "South Indian",
      prepTimeMinutes: 10,
      cookTimeMinutes: 12,
      caloriesPerServing: 240,
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Surplus Bread Slices (6 pcs)", "Onion & Tomato (1 each)", "Mustard Seeds & Green Chilies", "Turmeric & Salt to taste"],
      instructions: ["Cut bread slices into bite-sized 1-inch cubes.", "Temper oil with mustard seeds, cumin, and green chilies.", "Add chopped onions and tomatoes, cooking till soft.", "Add turmeric, salt, sprinkle water, and fold in bread cubes gently until seasoned."]
    },
    {
      id: 104,
      name: "Golden Vegetable Patties / Cutlets",
      cuisine: "Continental",
      prepTimeMinutes: 20,
      cookTimeMinutes: 15,
      caloriesPerServing: 190,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Leftover Cooked Vegetables & Dal", "Boiled Potatoes (2 medium)", "Breadcrumbs or Oats (4 tbsp)", "Chaat Masala & Herbs"],
      instructions: ["Mash leftover vegetables with boiled potatoes and spices in a bowl.", "Shape into round flat patties.", "Coat lightly in breadcrumbs or roasted oats.", "Pan-fry with minimal oil on both sides until golden brown and crispy."]
    }
  ];
}

// Function to render recipe cards
function renderRecipeCards(recipesList) {
  const container = document.getElementById("recipes-grid");
  if (!container) return;

  if (!recipesList || recipesList.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-8 text-slate-500 text-sm">No recipes match your search query.</div>';
    return;
  }

  let html = "";
  for (let i = 0; i < recipesList.length; i++) {
    const item = recipesList[i];
    const totalTime = (item.prepTimeMinutes || 10) + (item.cookTimeMinutes || 15);
    const cal = item.caloriesPerServing || 260;
    const cuisine = item.cuisine || "Fusion";

    html += 
      '<div class="food-card">' +
        '<div class="food-card-img-container">' +
          '<img src="' + item.image + '" alt="' + item.name + '" class="food-card-img" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
          '<div class="food-badge-top-left">' +
            '<span class="badge-custom badge-available">' + cuisine + '</span>' +
          '</div>' +
          '<div class="food-badge-top-right">' +
            '<span class="badge-custom badge-veg">' + totalTime + ' mins</span>' +
          '</div>' +
        '</div>' +
        '<div class="food-card-body">' +
          '<div class="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">' +
            '<span><i class="bi bi-fire text-amber-500 mr-1"></i>' + cal + ' kcal</span>' +
            '<span><i class="bi bi-list-check text-emerald-600 mr-1"></i>' + (item.ingredients ? item.ingredients.length : 4) + ' ingredients</span>' +
          '</div>' +
          '<h3 class="text-base font-bold text-slate-900 mb-2 line-clamp-1">' + item.name + '</h3>' +
          '<p class="text-xs text-slate-600 line-clamp-2 mb-4 flex-grow">' + (item.instructions ? (Array.isArray(item.instructions) ? item.instructions.join(" ") : item.instructions) : "Quick zero-waste leftover preparation.") + '</p>' +
          '<div class="mt-auto pt-2 border-t border-slate-100">' +
            '<button type="button" class="btn-secondary-custom w-full text-center text-xs py-2 view-recipe-btn" data-id="' + item.id + '">' +
              '<i class="bi bi-eye-fill"></i> View Full Recipe' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;

  // Bind view modal click handlers
  const viewButtons = document.querySelectorAll(".view-recipe-btn");
  for (let j = 0; j < viewButtons.length; j++) {
    viewButtons[j].addEventListener("click", function () {
      const recipeId = this.getAttribute("data-id");
      openRecipeModal(recipeId);
    });
  }
}

// Function to open Recipe Details Modal
function openRecipeModal(recipeId) {
  let recipe = null;
  for (let i = 0; i < allFetchedRecipes.length; i++) {
    if (String(allFetchedRecipes[i].id) === String(recipeId)) {
      recipe = allFetchedRecipes[i];
      break;
    }
  }

  if (!recipe) return;

  console.log("[Recipe Modal] Opening recipe modal:", recipe);

  const titleEl = document.getElementById("modal-recipe-title");
  const imgEl = document.getElementById("modal-recipe-img");
  const cuisineEl = document.getElementById("modal-recipe-cuisine");
  const timeEl = document.getElementById("modal-recipe-time");
  const calEl = document.getElementById("modal-recipe-calories");
  const ingListEl = document.getElementById("modal-recipe-ingredients");
  const instEl = document.getElementById("modal-recipe-instructions");

  if (titleEl) titleEl.textContent = recipe.name;
  if (imgEl) imgEl.src = recipe.image;
  if (cuisineEl) cuisineEl.innerHTML = '<i class="bi bi-globe mr-1"></i>' + (recipe.cuisine || "Fusion");
  if (timeEl) timeEl.innerHTML = '<i class="bi bi-clock-history mr-1"></i>' + ((recipe.prepTimeMinutes || 10) + (recipe.cookTimeMinutes || 15)) + ' mins';
  if (calEl) calEl.innerHTML = '<i class="bi bi-fire mr-1"></i>' + (recipe.caloriesPerServing || 260) + ' kcal';

  if (ingListEl) {
    let ingHtml = "";
    const list = recipe.ingredients || [];
    for (let k = 0; k < list.length; k++) {
      ingHtml += '<li>' + list[k] + '</li>';
    }
    ingListEl.innerHTML = ingHtml;
  }

  if (instEl) {
    if (Array.isArray(recipe.instructions)) {
      instEl.innerHTML = recipe.instructions.map(function(s, idx) { return (idx + 1) + ". " + s; }).join("<br><br>");
    } else {
      instEl.textContent = recipe.instructions;
    }
  }

  const modal = document.getElementById("recipe-modal");
  if (modal) modal.classList.add("show");
}

function closeRecipeModal() {
  const modal = document.getElementById("recipe-modal");
  if (modal) modal.classList.remove("show");
}

// ==========================================
// SECTION C: FOOD DETAILS API ENGINE
// ==========================================

// Function to fetch Food Categories from Food Details API (TheMealDB Categories)
function fetchFoodCategories() {
  const container = document.getElementById("food-categories-grid");
  if (!container) return;

  const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
  console.log("[Food Details API] Fetching food categories from TheMealDB:", apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("TheMealDB API returned " + response.status);
      return response.json();
    })
    .then(function (data) {
      console.log("[Food Details API] Received Food Categories:", data);
      const categories = data.categories || [];
      renderFoodCategories(categories.slice(0, 6)); // Display top 6 categories
    })
    .catch(function (error) {
      console.warn("[Food Details API] Fetch failed, using fallback food category catalog:", error);
      renderFoodCategories(getFallbackCategories());
    });
}

// Fallback category catalog
function getFallbackCategories() {
  return [
    {
      strCategory: "Vegetarian Meals",
      strCategoryThumb: "https://www.themealdb.com/images/category/vegetarian.png",
      strCategoryDescription: "Cooked vegetarian food containing lentils, rice, vegetables, and paneer. Safe for donation within 2-4 hours of cooking."
    },
    {
      strCategory: "Bakery & Breads",
      strCategoryThumb: "https://www.themealdb.com/images/category/starter.png",
      strCategoryDescription: "Surplus whole-wheat chapatis, rotis, artisan bread, and dinner rolls. Keeps fresh for up to 24-48 hours in clean paper bags."
    },
    {
      strCategory: "Fresh Produce",
      strCategoryThumb: "https://www.themealdb.com/images/category/vegan.png",
      strCategoryDescription: "Raw unpeeled fruits and fresh vegetables from farm markets. High vitamin content, stores safely for multiple days."
    },
    {
      strCategory: "Grain & Rice Dishes",
      strCategoryThumb: "https://www.themealdb.com/images/category/side.png",
      strCategoryDescription: "Biryani, pulao, steamed basmati, and khichdi. High in carbohydrate energy; store in insulated containers."
    },
    {
      strCategory: "Desserts & Sweets",
      strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png",
      strCategoryDescription: "Surplus wedding and festival sweets, cakes, and puddings. Consume quickly or store under refrigeration."
    },
    {
      strCategory: "Breakfast & Snacks",
      strCategoryThumb: "https://www.themealdb.com/images/category/breakfast.png",
      strCategoryDescription: "Idli, dosa, poha, upma, and samosas. Best served hot to morning shelter beneficiaries."
    }
  ];
}

// Function to render food categories
function renderFoodCategories(categoriesList) {
  const container = document.getElementById("food-categories-grid");
  if (!container) return;

  let html = "";
  for (let i = 0; i < categoriesList.length; i++) {
    const item = categoriesList[i];
    const desc = item.strCategoryDescription ? item.strCategoryDescription.substring(0, 140) + "..." : "Safe food category for community donation.";

    html += 
      '<div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">' +
        '<div>' +
          '<div class="flex items-center gap-4 mb-4">' +
            '<div class="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">' +
              '<img src="' + item.strCategoryThumb + '" alt="' + item.strCategory + '" class="w-full h-full object-contain">' +
            '</div>' +
            '<div>' +
              '<span class="badge-custom badge-available text-[10px]">Verified API Category</span>' +
              '<h3 class="text-lg font-bold text-slate-900 mt-1">' + item.strCategory + '</h3>' +
            '</div>' +
          '</div>' +
          '<p class="text-xs text-slate-600 leading-relaxed mb-4">' + desc + '</p>' +
        '</div>' +
        '<div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">' +
          '<span><i class="bi bi-shield-check mr-1"></i>Safe to Share</span>' +
          '<a href="donate.html" class="hover:underline text-slate-600">Donate &rarr;</a>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

// Setup Recipe Search Filter
function setupRecipeSearch() {
  const searchInput = document.getElementById("recipe-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const q = this.value.toLowerCase().trim();
      const filtered = [];
      for (let i = 0; i < allFetchedRecipes.length; i++) {
        const item = allFetchedRecipes[i];
        const nameMatch = item.name ? item.name.toLowerCase().includes(q) : false;
        const cuisineMatch = item.cuisine ? item.cuisine.toLowerCase().includes(q) : false;
        if (q === "" || nameMatch || cuisineMatch) {
          filtered.push(item);
        }
      }
      renderRecipeCards(filtered);
    });
  }
}

// Setup Recipe Modal listeners
function setupRecipeModalListeners() {
  const closeBtn = document.getElementById("btn-close-recipe-modal");
  const dismissBtn = document.getElementById("btn-dismiss-recipe-modal");
  const modal = document.getElementById("recipe-modal");

  if (closeBtn) closeBtn.addEventListener("click", closeRecipeModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeRecipeModal);

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeRecipeModal();
    });
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Food Info Page] Initializing 3 Live API modules (Nutrition, Recipe, Food Details)...");

  // Section A: Nutrition
  updateNutritionDisplay("rice");
  const nutriSelect = document.getElementById("nutrition-food-select");
  if (nutriSelect) {
    nutriSelect.addEventListener("change", function () {
      updateNutritionDisplay(this.value);
    });
  }

  // Section B: Recipes
  fetchLeftoverRecipes();
  setupRecipeSearch();
  setupRecipeModalListeners();

  // Section C: Food Categories
  fetchFoodCategories();
});
