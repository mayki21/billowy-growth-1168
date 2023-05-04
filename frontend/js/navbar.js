const toggleButton = document.querySelector(".navbar-toggle");
const menu = document.querySelector(".navbar-menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("navbar-menu-active");
});
