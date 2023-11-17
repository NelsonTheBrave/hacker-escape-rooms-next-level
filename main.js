// Variables

// HTML elements
const challengesContainer = document.querySelector(".challenges-container.main-page");
const filterDiv = document.querySelector(".filterDiv");
const filterButton = document.querySelector(".filterButton");
const closeMenu = document.querySelector(".closeMenu");
const stars = document.querySelectorAll(".stars i");
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
if (filterButton == null) {
  console.log('null');
} else {filterButton.addEventListener("click", () => {
  filterDiv.style.display = "block";
  filterButton.style.display = "none";
});
closeMenu.addEventListener("click", () => {
  filterDiv.style.display = "none";
  filterButton.style.display = "block";
});
}

// Function for adding and removing stars

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

// Top three rated cards on main page
console.log('hej');
// Fetch card data from API
async function fetchChallengesAndSortFromRating() {
  const fetchedChallengesResponse = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  console.log('hej');
  const fetchedChallengesData = await fetchedChallengesResponse.json();
  // Sort card data according to rating
  fetchedChallengesData.challenges.sort((r1, r2) =>
    r1.rating < r2.rating ? 1 : r1.rating > r2.rating ? -1 : 0
  );
  // Create new array with only three highest ranked cards
  const topThreeChallenges = fetchedChallengesData.challenges.splice(0, 3);
  // Create 3 new cards to add to DOM

  for (let i = 0; i < 3; i++) {
  newCard = document.createElement("div");
  newCard.classList = "challenges-container__challenge";
  newCard.innerHTML = `
<img
  class="challenges-container__challenge__img"
  src="${topThreeChallenges[i].image}"
  alt="Image that illustrates the challenge"
/>
<div class="challenges-container__challenge__lowerWrapper">
<h3 class="challenges-container__challenge__title">
${topThreeChallenges[i].title}
</h3>
<small class="challenges-container__challenge__rating">
  <span class="challenges-container__challenge__rating__stars" aria-label="Rating" role="meter" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${topThreeChallenges[i].rating}">
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
  </span>
  <span
    class="challenges-container__challenge__rating__participants"
  >${topThreeChallenges[i].minParticipants}-${topThreeChallenges[i].maxParticipants} participants</span>
</small>
<p class="challenges-container__challenge__text">
${topThreeChallenges[i].description}
</p>
<button class="challenges-container__challenge__button" "${topThreeChallenges[i].type}">
${topThreeChallenges[i].type}</button>
</div>`;
  challengesContainer.appendChild(newCard);
}
}

fetchChallengesAndSortFromRating();

// description
// :
// "Try your hardest and succeed. Or fail"
// id
// :
// 1
// image
// :
// "https://placekitten.com/640/480"
// labels
// :
// (3) ['linux', 'web', 'javascript']
// maxParticipants
// :
// 4
// minParticipants
// :
// 2
// rating
// :
// 1
// title
// :
// "Project: X of Doom"
// type
// :
// "onsite"
