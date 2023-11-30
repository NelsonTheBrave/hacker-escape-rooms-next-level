import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { openPopup } from './mobile-menu.js';
import { FilterUI } from './filterUI.js';
import { FilterLogic } from './filter-logic.js';

const isOnMainPage = document.querySelector('.main-page');
const isOnChallengeSite = document.querySelector('.challenges-site');

// HTML elements
const filterDiv = document.querySelector('.filterDiv');
const filterButton = document.querySelector('.filterButton');
const closeMenu = document.querySelector('.closeMenu');

// Event listeners
document.querySelector('.navbar-button').addEventListener('click', openPopup);

// Filter button and close filter
if (!isOnMainPage) {
  filterButton.addEventListener('click', () => {
    filterDiv.style.display = 'block';
    filterButton.style.display = 'none';
  });
  closeMenu.addEventListener('click', () => {
    filterDiv.style.display = 'none';
    filterButton.style.display = 'block';
  });
}

// ███████████████ Entry Point ███████████████ -------------------------------------------------------------------------

if (isOnChallengeSite) {
  const challengesContainer = document.querySelector(
    '.challenges-container.challenges-site'
  );
  let view = new ChallengeListView();
  view.render(challengesContainer);
  new FilterUI().render(challengesContainer);
}

if (isOnMainPage) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
}