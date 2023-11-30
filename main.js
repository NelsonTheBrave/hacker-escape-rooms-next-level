import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { FilterUI } from './filterUI.js';
import { FilterButton } from './filter-button.js';
import { MobileMenu } from './mobile-menu.js';

const isOnMainPage = document.querySelector('.main-page');
const isOnChallengeSite = document.querySelector('.challenges-site');






// ███████████████ Entry Point ███████████████ -------------------------------------------------------------------------

if (isOnChallengeSite) {
  const challengesContainer = document.querySelector(
    '.challenges-container.challenges-site'
  );
  let view = new ChallengeListView();
  view.render(challengesContainer);
  new FilterUI().render(challengesContainer);
  new FilterButton().render();
}

if (isOnMainPage) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
  const mobileMenu = new MobileMenu
}