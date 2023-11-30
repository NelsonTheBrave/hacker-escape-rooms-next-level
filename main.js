import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { FilterUI } from './filterUI.js';
import { FilterButton } from './filter-button.js';
import { MobileMenu } from './mobile-menu.js';

const isOnMainPage = document.querySelector('.main-page');
const isOnChallengeSite = document.querySelector('.challenges-site');
const filterInfoStart = {
  tagsAndType: [],
  rating: [0, 5],
  keyword: '',
};

console.log(document.location.href);
//127.0.0.1:5500/challenges.html?name

// ███████████████ Entry Point ███████████████ -------------------------------------------------------------------------

http: if (isOnChallengeSite) {
  const challengesContainer = document.querySelector(
    '.challenges-container.challenges-site'
  );
  new ChallengeListView().render(challengesContainer);
  new FilterButton().render();

  setTimeout(() => {
    if (
      document.location.href == 'http://127.0.0.1:5500/challenges.html?online'
    ) {
      let onlineChallenges = {
        tagsAndType: ['online'],
        rating: [0, 5],
        keyword: '',
      };
      new FilterUI(onlineChallenges).render(challengesContainer);
    } else if (
      document.location.href == 'http://127.0.0.1:5500/challenges.html?onsite'
    ) {
      let onsiteChallenges = {
        tagsAndType: ['onsite'],
        rating: [0, 5],
        keyword: '',
      };
      new FilterUI(onsiteChallenges).render(challengesContainer);
    } else {
      new FilterUI(filterInfoStart).render(challengesContainer);
    }
  }, 500);
}

if (isOnMainPage) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
  new MobileMenu();
  // document.querySelector('.buttons__onlineBtn').addEventListener('click', () => {console.log('hej')<;})
}
