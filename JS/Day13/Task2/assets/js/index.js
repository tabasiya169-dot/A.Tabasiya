
let heading = document.getElementById("heading");


let button = document.getElementById("btn");

button.addEventListener("click", function() {

    heading.textContent = "Welcome to DOM";

    heading.style.color = "blue";

    heading.classList.add("newStyle");
});