const box = document.querySelector("#box");
const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", () => {
    box.classList.add("active");
});