const card = document.querySelector("#card");
const toggleBtn = document.querySelector("#toggleBtn");

toggleBtn.addEventListener("click", () => {
    card.classList.toggle("dark");
});