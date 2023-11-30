import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { FilterUI } from './filterUI.js';
import { FilterButton } from './filter-button.js';
import { MobileMenu } from './mobile-menu.js';

const isOnMainPage = document.querySelector('.main-page');
const isOnChallengeSite = document.querySelector('.challenges-site');
const filterInfoStart = {
  tagsAndType: ['onsite'],
  rating: [0, 5],
  keyword: '',
};


// ███████████████ Entry Point ███████████████ -------------------------------------------------------------------------

if (isOnChallengeSite) {
  const challengesContainer = document.querySelector(
    '.challenges-container.challenges-site'
  );
  new ChallengeListView().render(challengesContainer);
  new FilterButton().render();
  setTimeout(() => {
  new FilterUI(filterInfoStart).render(challengesContainer);
    
  }, 1000);

}

if (isOnMainPage) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
  new MobileMenu;
  // document.querySelector('.buttons__onlineBtn').addEventListener('click', () => {console.log('hej')<;})
}