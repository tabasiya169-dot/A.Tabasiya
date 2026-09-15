/**
 * Donate Food Page JavaScript (donate.js)
 * Leftover Food Donation Platform
 * 
 * Rules:
 * - Pure Vanilla JS with DOM Manipulation
 * - Strictly const and let (No var)
 * - Standard function declarations (No arrow functions)
 * - Form validation, LocalStorage persistence & Console logging
 */

// Function to set default datetime to current time
function setDefaultPreparedDateTime() {
  const preparedInput = document.getElementById("preparedDate");
  if (preparedInput) {
    const now = new Date();
    // Format to YYYY-MM-DDTHH:MM for input datetime-local
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    
    preparedInput.value = year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  }
}

// Function to update live preview card in real-time
function updateLivePreview() {
  const foodName = document.getElementById("foodName").value || "Your Food Name";
  const category = document.getElementById("category").value || "Cooked Meals";
  const quantity = document.getElementById("quantity").value || "10";
  const quantityUnit = document.getElementById("quantityUnit").value || "Servings";
  const foodType = document.getElementById("foodType").value || "Vegetarian";
  const donorName = document.getElementById("donorName").value || "Donor Name";
  const pickupLocation = document.getElementById("pickupLocation").value || "Pickup Location";
  const description = document.getElementById("description").value || "Safe leftover food packed with care.";
  const imageUrl = document.getElementById("imageUrl").value;

  const previewFoodName = document.getElementById("preview-food-name");
  const previewCategory = document.getElementById("preview-category");
  const previewQty = document.getElementById("preview-qty");
  const previewTypeBadge = document.getElementById("preview-type-badge");
  const previewDonor = document.getElementById("preview-donor");
  const previewLocation = document.getElementById("preview-location");
  const previewDesc = document.getElementById("preview-desc");
  const previewImg = document.getElementById("preview-img");

  if (previewFoodName) previewFoodName.textContent = foodName;
  if (previewCategory) previewCategory.innerHTML = '<i class="bi bi-tag-fill text-emerald-600 mr-1"></i>' + category;
  if (previewQty) previewQty.innerHTML = '<i class="bi bi-pie-chart-fill text-amber-500 mr-1"></i>' + quantity + ' ' + quantityUnit;
  if (previewDonor) previewDonor.textContent = donorName;
  if (previewLocation) previewLocation.textContent = pickupLocation;
  if (previewDesc) previewDesc.textContent = description;

  if (previewTypeBadge) {
    previewTypeBadge.textContent = foodType;
    if (foodType === "Vegetarian") {
      previewTypeBadge.className = "badge-custom badge-veg";
    } else if (foodType === "Non-Vegetarian") {
      previewTypeBadge.className = "badge-custom badge-nonveg";
    } else if (foodType === "Vegan") {
      previewTypeBadge.className = "badge-custom badge-vegan";
    }
  }

  // Automatic photo placeholder based on category
  let defaultImgUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
  if (category === "Cooked Meals") {
    defaultImgUrl = "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80";
  } else if (category === "Bakery") {
    defaultImgUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  } else if (category === "Fresh Produce") {
    defaultImgUrl = "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80";
  } else if (category === "Grains & Cereals") {
    defaultImgUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80";
  }

  if (previewImg) {
    previewImg.src = imageUrl && imageUrl.trim() !== "" ? imageUrl : defaultImgUrl;
  }
}

// Function to clear error messages
function clearFormErrors() {
  const errorElements = document.querySelectorAll(".form-feedback.error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
    errorElements[i].classList.add("hidden");
  }

  const invalidInputs = document.querySelectorAll(".form-control-custom.is-invalid");
  for (let j = 0; j < invalidInputs.length; j++) {
    invalidInputs[j].classList.remove("is-invalid");
  }
}

// Function to render donor's recent donations from LocalStorage
function renderRecentDonationsList() {
  const container = document.getElementById("recent-donations-grid");
  if (!container) return;

  const donations = getDonations();

  if (donations.length === 0) {
    container.innerHTML = 
      '<div class="col-span-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">' +
        'No donations listed yet in your session. Post your first donation above!' +
      '</div>';
    return;
  }

  let html = "";
  // Show last 3 donations
  const recent = donations.slice(-3).reverse();

  for (let i = 0; i < recent.length; i++) {
    const item = recent[i];

    let badgeClass = "badge-available";
    if (item.status === "Pickup Requested") badgeClass = "badge-requested";
    else if (item.status === "Accepted") badgeClass = "badge-accepted";
    else if (item.status === "Completed") badgeClass = "badge-completed";

    html += 
      '<div class="food-card">' +
        '<div class="food-card-img-container">' +
          '<img src="' + item.imageUrl + '" alt="' + item.foodName + '" class="food-card-img" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80\'">' +
          '<div class="food-badge-top-left">' +
            '<span class="badge-custom ' + badgeClass + '">' + item.status + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="food-card-body">' +
          '<div class="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">' +
            '<span>' + item.category + '</span>' +
            '<span>' + item.quantity + ' ' + item.quantityUnit + '</span>' +
          '</div>' +
          '<h4 class="text-base font-bold text-slate-900 mb-1">' + item.foodName + '</h4>' +
          '<p class="text-xs text-slate-500 line-clamp-2 mb-3">' + item.description + '</p>' +
          '<div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">' +
            '<div><i class="bi bi-geo-alt-fill text-rose-500 mr-1"></i>' + item.pickupLocation + '</div>' +
            '<div><i class="bi bi-calendar-check text-emerald-600 mr-1"></i>' + formatDate(item.createdAt) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

// Function to handle form submission
function handleDonationSubmit(event) {
  event.preventDefault();
  clearFormErrors();

  const formData = {
    donorName: document.getElementById("donorName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    foodName: document.getElementById("foodName").value,
    category: document.getElementById("category").value,
    quantity: document.getElementById("quantity").value,
    quantityUnit: document.getElementById("quantityUnit").value,
    foodType: document.getElementById("foodType").value,
    preparedDate: document.getElementById("preparedDate").value,
    expiryDate: document.getElementById("expiryDate").value,
    pickupLocation: document.getElementById("pickupLocation").value,
    imageUrl: document.getElementById("imageUrl").value,
    description: document.getElementById("description").value
  };

  console.log("[Donation Form] User submitted form data:", formData);

  // Validate form inputs
  const validation = validateDonationForm(formData);

  if (!validation.isValid) {
    console.warn("[Donation Form] Validation failed:", validation.errors);

    // Render error feedback under each input
    const errorKeys = Object.keys(validation.errors);
    for (let i = 0; i < errorKeys.length; i++) {
      const field = errorKeys[i];
      const errorMsg = validation.errors[field];
      const errorEl = document.getElementById("err-" + field);
      const inputEl = document.getElementById(field);

      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.remove("hidden");
      }
      if (inputEl) {
        inputEl.classList.add("is-invalid");
      }
    }

    showToast("Please fill in all required fields accurately.", "danger");
    return;
  }

  // Create standardized donation object
  const newDonation = createDonationObject(formData);
  console.log("[Donation Form] Constructed new donation object:", newDonation);

  // Save to LocalStorage
  const donations = getDonations();
  donations.push(newDonation);
  saveDonations(donations);

  console.log("[LocalStorage] Total donations now stored:", donations.length);

  // Show success feedback in UI
  const alertContainer = document.getElementById("form-alert-container");
  if (alertContainer) {
    alertContainer.className = "p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 mb-8 block shadow-sm";
    alertContainer.innerHTML = 
      '<div class="flex items-start gap-3">' +
        '<i class="bi bi-check-circle-fill text-emerald-600 text-2xl mt-0.5"></i>' +
        '<div>' +
          '<h4 class="text-base font-bold">Donation Posted Successfully!</h4>' +
          '<p class="text-xs text-emerald-700 mt-1">Your food listing <strong>"' + newDonation.foodName + '"</strong> (' + newDonation.quantity + ' ' + newDonation.quantityUnit + ') has been registered with ID <strong>' + newDonation.id + '</strong>. Local volunteers and shelters can now request pickup.</p>' +
          '<div class="mt-3 flex gap-3">' +
            '<a href="available.html" class="btn-primary-custom text-xs py-1.5 px-3">View in Marketplace</a>' +
            '<a href="dashboard.html" class="btn-secondary-custom text-xs py-1.5 px-3">View in Dashboard</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Scroll to alert
    alertContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  showToast("Donation posted successfully! Ready for pickup match.", "success");

  // Reset form and re-render recent list
  document.getElementById("donation-form").reset();
  setDefaultPreparedDateTime();
  updateLivePreview();
  renderRecentDonationsList();
}

// Function to handle form clear / reset
function handleFormReset() {
  document.getElementById("donation-form").reset();
  clearFormErrors();
  setDefaultPreparedDateTime();
  updateLivePreview();
  showToast("Form cleared.", "info");
}

// Setup input listeners for real-time live preview
function setupPreviewListeners() {
  const fields = ["foodName", "category", "quantity", "quantityUnit", "foodType", "donorName", "pickupLocation", "description", "imageUrl"];

  for (let i = 0; i < fields.length; i++) {
    const el = document.getElementById(fields[i]);
    if (el) {
      el.addEventListener("input", updateLivePreview);
      el.addEventListener("change", updateLivePreview);
    }
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log("[Donate Page] Initializing donation form listeners and preview bindings...");
  
  setDefaultPreparedDateTime();
  setupPreviewListeners();
  updateLivePreview();
  renderRecentDonationsList();

  const form = document.getElementById("donation-form");
  if (form) {
    form.addEventListener("submit", handleDonationSubmit);
  }

  const clearBtn = document.getElementById("btn-clear-form");
  if (clearBtn) {
    clearBtn.addEventListener("click", handleFormReset);
  }
});
