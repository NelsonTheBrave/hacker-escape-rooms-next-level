// Variables
const navBar = document.querySelector(".navBar");

// Event listeners
document.querySelector(".navbar-button").addEventListener("click", openPopup);
visualViewport.onresize = closePopup;

//Event handlers
function openPopup() {
  document.querySelector("body").style.overflow = "hidden";
  const html = document.querySelector("html");
  html.setAttribute("class", "--transparant");
  setTimeout(() => {
    html.classList.remove("--transparant");
    navBar.setAttribute("class", "navBar--popup");
  }, 200);
  navBar.addEventListener("click", closePopup);
}

function closePopup(event) {
  if (
    event.target.nodeName === "BUTTON" ||
    event.target.nodeName == "A" ||
    event.target.width > 900
  ) {
    navBar.setAttribute("class", "navBar");
    document.querySelector("body").style.overflow = "auto";
  }
}
// pull request test

stars = document.querySelectorAll(".stars i");
console.log(stars);

stars2 = document.querySelectorAll(".stars2 i");
console.log(stars2);

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

stars2.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars2.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});
