let detailsBtn = document.getElementById("detailsBtn");
let details = document.getElementById("details");

detailsBtn.addEventListener("click", function () {

    details.classList.toggle("show");

    if (details.classList.contains("show")) {
        detailsBtn.textContent = "Hide Details";
    } else {
        detailsBtn.textContent = "Show Details";
    }

});