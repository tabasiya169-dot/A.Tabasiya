const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Input Values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // getItem()
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find()
    const user = users.find(function(item) {
        return item.email == email && item.password == password;
    });

    // Email && Password
    if (user) {

        localStorage.setItem("loggedUser", JSON.stringify(user));

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerText =
            "Invalid email or password";

    }

});