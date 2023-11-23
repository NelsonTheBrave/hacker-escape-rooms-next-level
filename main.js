// Variables

// HTML elements
const stars = document.querySelectorAll(".stars i");
const filterDiv = document.querySelector(".filterDiv");
const filterButton = document.querySelector(".filterButton");
const closeMenu = document.querySelector(".closeMenu");
const stars2 = document.querySelectorAll(".stars2 i");
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

// Filter button and close filter
filterButton.addEventListener("click", () => {
  filterDiv.style.display = "block";
  filterButton.style.display = "none";
});
closeMenu.addEventListener("click", () => {
  filterDiv.style.display = "none";
  filterButton.style.display = "block";
});

// Function for adding and removing stars
let lowerRating = 0;
let upperRating = 0;

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    lowerRating = 0;
    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("active"); 
        lowerRating = lowerRating + 1 }
        else {
        star.classList.remove("active");}
      })});
  });

stars2.forEach((star, index1) => {
  star.addEventListener("click", () => {
    upperRating = 0;
    stars2.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("active"); 
        upperRating = upperRating + 1 }
        else {
        star.classList.remove("active");}
      })});
  });
