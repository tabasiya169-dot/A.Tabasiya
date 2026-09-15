const donationForm = document.getElementById("donationForm");
const foodCards = document.getElementById("foodCards");
const searchFood = document.getElementById("searchFood");

const statDonations = document.getElementById("statDonations");
const statRequests = document.getElementById("statRequests");
const statAvailable = document.getElementById("statAvailable");
const statSaved = document.getElementById("statSaved");

const dashDonations = document.getElementById("dashDonations");
const dashAvailable = document.getElementById("dashAvailable");
const dashRequests = document.getElementById("dashRequests");
const dashSaved = document.getElementById("dashSaved");

const dashboardTable = document.getElementById("dashboardTable");

const donationMessage = document.getElementById("donationMessage");

const apiFoodInput = document.getElementById("apiFoodInput");
const loadApiData = document.getElementById("loadApiData");

const foodApiResult = document.getElementById("foodApiResult");
const nutritionApiResult = document.getElementById("nutritionApiResult");
const recipeApiResult = document.getElementById("recipeApiResult");
const weatherApiResult = document.getElementById("weatherApiResult");
const locationApiResult = document.getElementById("locationApiResult");


/* SAMPLE FOOD DATA */

const defaultFood = [
    {
        id: 1,
        donor: "Anitha",
        food: "Vegetable Rice",
        category: "Rice & Meals",
        quantity: 5,
        location: "Mangadu",
        phone: "9876543210",
        description: "Fresh homemade vegetable rice",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
        status: "Available"
    },
    {
        id: 2,
        donor: "Rahul",
        food: "Chapati & Vegetable Curry",
        category: "Chapati & Bread",
        quantity: 8,
        location: "Porur",
        phone: "9876543211",
        description: "Homemade chapati with vegetable curry",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
        status: "Available"
    },
    {
        id: 3,
        donor: "Priya",
        food: "Fresh Fruits",
        category: "Fruits",
        quantity: 10,
        location: "Poonamallee",
        phone: "9876543212",
        description: "Fresh mixed fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80",
        status: "Available"
    }
];


/* LOCAL STORAGE */

const getDonations = function () {

    const savedData = localStorage.getItem("sharePlateDonations");

    if (savedData) {
        return JSON.parse(savedData);
    }

    localStorage.setItem(
        "sharePlateDonations",
        JSON.stringify(defaultFood)
    );

    return defaultFood;
};


const saveDonations = function (donations) {

    localStorage.setItem(
        "sharePlateDonations",
        JSON.stringify(donations)
    );
};


const getRequests = function () {

    const savedRequests = localStorage.getItem("sharePlateRequests");

    if (savedRequests) {
        return JSON.parse(savedRequests);
    }

    return [];
};


const saveRequests = function (requests) {

    localStorage.setItem(
        "sharePlateRequests",
        JSON.stringify(requests)
    );
};


/* FOOD IMAGE */

const getFoodImage = function (category) {

    if (category === "Fruits") {
        return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80";
    }

    if (category === "Vegetables") {
        return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80";
    }

    if (category === "Chapati & Bread") {
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80";
    }

    return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80";
};


/* UPDATE STATISTICS */

const updateStats = function () {

    const donations = getDonations();
    const requests = getRequests();

    let availableMeals = 0;

    donations.forEach(function (item) {

        if (item.status === "Available") {
            availableMeals = availableMeals + Number(item.quantity);
        }

    });

    const mealsSaved = requests.length;

    if (statDonations) {
        statDonations.textContent = donations.length;
    }

    if (statRequests) {
        statRequests.textContent = requests.length;
    }

    if (statAvailable) {
        statAvailable.textContent = availableMeals;
    }

    if (statSaved) {
        statSaved.textContent = mealsSaved;
    }

    if (dashDonations) {
        dashDonations.textContent = donations.length;
    }

    if (dashAvailable) {
        dashAvailable.textContent = availableMeals;
    }

    if (dashRequests) {
        dashRequests.textContent = requests.length;
    }

    if (dashSaved) {
        dashSaved.textContent = mealsSaved;
    }

    console.log("Donation Statistics:", {
        totalDonations: donations.length,
        totalRequests: requests.length,
        availableMeals: availableMeals,
        mealsSaved: mealsSaved
    });
};


/* RENDER FOOD CARDS */

const renderFoodCards = function (keyword) {

    const donations = getDonations();

    if (!foodCards) {
        return;
    }

    foodCards.innerHTML = "";

    let filteredFood = donations;

    if (keyword) {

        const searchText = keyword.toLowerCase();

        filteredFood = donations.filter(function (item) {

            return (
                item.food.toLowerCase().includes(searchText) ||
                item.category.toLowerCase().includes(searchText) ||
                item.location.toLowerCase().includes(searchText)
            );

        });
    }


    if (filteredFood.length === 0) {

        foodCards.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    No food found.
                </div>
            </div>
        `;

        return;
    }


    filteredFood.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="food-card">

                <img src="${item.image}" alt="${item.food}">

                <div class="food-content">

                    <span class="food-badge">
                        ${item.category}
                    </span>

                    <h4 class="mt-3">
                        ${item.food}
                    </h4>

                    <p>
                        <strong>Quantity:</strong>
                        ${item.quantity} meals
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${item.location}
                    </p>

                    <p>
                        <strong>Donor:</strong>
                        ${item.donor}
                    </p>

                    <p>
                        ${item.description}
                    </p>

                    <button
                        class="request-btn mt-2"
                        onclick="requestFood(${item.id})">
                        Request Food
                    </button>

                </div>

            </div>
        `;

        foodCards.appendChild(card);
    });


    console.log("Food Cards Rendered:", filteredFood);
};


/* REQUEST FOOD */

const requestFood = function (foodId) {

    const donations = getDonations();

    const selectedFood = donations.find(function (item) {

        return item.id === foodId;

    });


    if (!selectedFood) {
        return;
    }


    const requests = getRequests();


    const request = {
        id: Date.now(),
        foodId: selectedFood.id,
        food: selectedFood.food,
        location: selectedFood.location,
        donor: selectedFood.donor,
        status: "Requested"
    };


    requests.push(request);

    saveRequests(requests);


    selectedFood.status = "Requested";

    saveDonations(donations);


    alert("Food request submitted successfully!");


    renderFoodCards(searchFood ? searchFood.value : "");
    renderDashboard();
    updateStats();


    console.log("New Food Request:", request);
};


/* DONATION FORM */

if (donationForm) {

    donationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const donorName = document.getElementById("donorName").value.trim();
        const foodName = document.getElementById("foodName").value.trim();
        const foodCategory = document.getElementById("foodCategory").value;
        const quantity = document.getElementById("quantity").value;
        const preparedDate = document.getElementById("preparedDate").value;
        const location = document.getElementById("location").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const description = document.getElementById("description").value.trim();


        const newDonation = {

            id: Date.now(),

            donor: donorName,

            food: foodName,

            category: foodCategory,

            quantity: Number(quantity),

            preparedDate: preparedDate,

            location: location,

            phone: phone,

            description: description || "Food available for donation",

            image: getFoodImage(foodCategory),

            status: "Available"

        };


        const donations = getDonations();

        donations.push(newDonation);

        saveDonations(donations);


        console.log("New Food Donation:", newDonation);
        console.log("All Donations:", donations);


        if (donationMessage) {

            donationMessage.innerHTML = `
                <div class="alert alert-success mt-3">
                    Food donation added successfully!
                </div>
            `;
        }


        donationForm.reset();

        renderFoodCards();
        renderDashboard();
        updateStats();


        setTimeout(function () {

            if (donationMessage) {
                donationMessage.innerHTML = "";
            }

        }, 3000);

    });

}


/* SEARCH FOOD */

if (searchFood) {

    searchFood.addEventListener("input", function () {

        renderFoodCards(searchFood.value);

    });

}


/* DASHBOARD */

const renderDashboard = function () {

    const donations = getDonations();

    if (!dashboardTable) {
        return;
    }

    dashboardTable.innerHTML = "";


    donations.forEach(function (item) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.food}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.location}</td>
            <td>${item.donor}</td>
            <td>${item.status}</td>
        `;

        dashboardTable.appendChild(row);

    });


    console.log("Dashboard Data:", donations);
};


/* API 1 - THE MEAL DB */

const fetchFoodDetails = async function (foodName) {

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/filter.php?i=" +
            encodeURIComponent(foodName)
        );

        const data = await response.json();

        console.log("API 1 - Food Details:", data);

        if (foodApiResult) {

            if (data.meals) {

                foodApiResult.innerHTML = `
                    <p><strong>Food:</strong> ${foodName}</p>
                    <p><strong>Meals Found:</strong> ${data.meals.length}</p>
                `;

            } else {

                foodApiResult.innerHTML = `
                    <p>No food details found.</p>
                `;

            }

        }

    } catch (error) {

        console.log("Food API Error:", error);

        if (foodApiResult) {
            foodApiResult.innerHTML = "Unable to load food details.";
        }

    }

};


/* API 2 - OPEN FOOD FACTS */

const fetchNutrition = async function (foodName) {

    try {

        const response = await fetch(
            "https://world.openfoodfacts.org/api/v2/search?categories_tags_en=" +
            encodeURIComponent(foodName) +
            "&page_size=3"
        );

        const data = await response.json();

        console.log("API 2 - Nutrition:", data);


        if (nutritionApiResult) {

            if (data.products && data.products.length > 0) {

                const product = data.products[0];

                nutritionApiResult.innerHTML = `
                    <p>
                        <strong>Product:</strong>
                        ${product.product_name || "Not available"}
                    </p>

                    <p>
                        <strong>Energy:</strong>
                        ${product.nutriments?.["energy-kcal_100g"] || "N/A"}
                        kcal / 100g
                    </p>

                    <p>
                        <strong>Protein:</strong>
                        ${product.nutriments?.proteins_100g || "N/A"} g
                    </p>
                `;

            } else {

                nutritionApiResult.innerHTML =
                    "No nutrition data found.";

            }

        }

    } catch (error) {

        console.log("Nutrition API Error:", error);

        if (nutritionApiResult) {
            nutritionApiResult.innerHTML =
                "Unable to load nutrition data.";
        }

    }

};


/* API 3 - RECIPE */

const fetchRecipes = async function (foodName) {

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
            encodeURIComponent(foodName)
        );

        const data = await response.json();

        console.log("API 3 - Recipe:", data);


        if (recipeApiResult) {

            if (data.meals) {

                const recipe = data.meals[0];

                recipeApiResult.innerHTML = `
                    <p>
                        <strong>Recipe:</strong>
                        ${recipe.strMeal}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${recipe.strCategory}
                    </p>

                    <p>
                        <strong>Area:</strong>
                        ${recipe.strArea}
                    </p>
                `;

            } else {

                recipeApiResult.innerHTML =
                    "No recipe found.";

            }

        }

    } catch (error) {

        console.log("Recipe API Error:", error);

        if (recipeApiResult) {
            recipeApiResult.innerHTML =
                "Unable to load recipe.";
        }

    }

};


/* API 4 - OPEN METEO WEATHER */

const fetchWeather = async function () {

    try {

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,weather_code"
        );

        const data = await response.json();

        console.log("API 4 - Weather:", data);


        if (weatherApiResult) {

            weatherApiResult.innerHTML = `
                <p>
                    <strong>Location:</strong>
                    Chennai
                </p>

                <p>
                    <strong>Temperature:</strong>
                    ${data.current.temperature_2m} °C
                </p>

                <p>
                    <strong>Weather Code:</strong>
                    ${data.current.weather_code}
                </p>
            `;

        }

    } catch (error) {

        console.log("Weather API Error:", error);

        if (weatherApiResult) {
            weatherApiResult.innerHTML =
                "Unable to load weather.";
        }

    }

};


/* API 5 - NOMINATIM LOCATION */

const fetchLocation = async function () {

    try {

        const response = await fetch(
            "https://nominatim.openstreetmap.org/reverse?lat=13.0827&lon=80.2707&format=json"
        );

        const data = await response.json();

        console.log("API 5 - Location:", data);


        if (locationApiResult) {

            locationApiResult.innerHTML = `
                <p>
                    <strong>City:</strong>
                    ${data.address?.city ||
                    data.address?.town ||
                    data.address?.state_district ||
                    "Chennai"}
                </p>

                <p>
                    <strong>State:</strong>
                    ${data.address?.state || "Tamil Nadu"}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${data.address?.country || "India"}
                </p>
            `;

        }

    } catch (error) {

        console.log("Location API Error:", error);

        if (locationApiResult) {
            locationApiResult.innerHTML =
                "Unable to load location.";
        }

    }

};


/* LOAD ALL APIs */

const loadAllApis = async function () {

    const foodName = apiFoodInput?.value.trim() || "chicken";

    if (foodApiResult) {
        foodApiResult.innerHTML = "Loading...";
    }

    if (nutritionApiResult) {
        nutritionApiResult.innerHTML = "Loading...";
    }

    if (recipeApiResult) {
        recipeApiResult.innerHTML = "Loading...";
    }

    if (weatherApiResult) {
        weatherApiResult.innerHTML = "Loading...";
    }

    if (locationApiResult) {
        locationApiResult.innerHTML = "Loading...";
    }


    await fetchFoodDetails(foodName);

    await fetchNutrition(foodName);

    await fetchRecipes(foodName);

    await fetchWeather();

    await fetchLocation();


    console.log("All API data loaded successfully.");
};


/* API BUTTON */

if (loadApiData) {

    loadApiData.addEventListener("click", function () {

        loadAllApis();

    });

}


/* INITIAL LOAD */

renderFoodCards();

renderDashboard();

updateStats();

console.log("SharePlate application loaded successfully.");