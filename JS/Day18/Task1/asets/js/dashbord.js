// getItem()
const loggedUser = localStorage.getItem("loggedUser");

// JSON.parse()
const user = JSON.parse(loggedUser);

// Display User
document.getElementById("userDetails").innerHTML =
    "Name: " + user.name + "<br>" +
    "Email: " + user.email;


// Logout
document.getElementById("logoutBtn").addEventListener("click", function() {

    // removeItem()
    localStorage.removeItem("loggedUser");

    window.location.href = "login page.html";

});