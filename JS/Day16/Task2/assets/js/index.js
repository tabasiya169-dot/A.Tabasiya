const box = document.querySelector("#box");
const removeBtn = document.querySelector("#removeBtn");

removeBtn.addEventListener("click", () => {
    box.classList.remove("active");
});