const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Input Values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if (name == "" || email == "" || password == "") {
        document.getElementById("message").innerText = "Please fill all fields";
        return;
    }

    // Create Object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Get Existing Array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // push()
    users.push(user);

    // JSON.stringify()
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerText = "Registration successful";

    registerForm.reset();

});