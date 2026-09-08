let para = document.getElementById("para");
let btn = document.getElementById("btn");

btn.addEventListener("click", function () {

    para.classList.toggle("show");

    if (para.classList.contains("show")) {
        btn.textContent = "Hide Content";
    } else {
        btn.textContent = "Show Content";
    }

});