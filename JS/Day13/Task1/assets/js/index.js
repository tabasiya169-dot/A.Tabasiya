
let heading = document.getElementById("heading");

heading.textContent = "DOM Selector Example";


let paragraphs = document.querySelectorAll(".para");


paragraphs[0].textContent = "First paragraph changed";
paragraphs[1].textContent = "Second paragraph changed";
paragraphs[2].textContent = "Third paragraph changed";