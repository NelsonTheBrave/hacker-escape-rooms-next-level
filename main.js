import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { Filter } from './filterByTag.js';
import { FilterButton } from './filterByTag.js';
import { openPopup } from './mobile-menu.js';
import { ChallengeKeyFilter } from './keywordFilter.js';

const isOnMainPage = document.querySelector('.main-page');
const isOnChallengeSite = document.querySelector('.challenges-site');

// HTML elements
const stars = document.querySelectorAll('.stars i');
const filterDiv = document.querySelector('.filterDiv');
const filterButton = document.querySelector('.filterButton');
const closeMenu = document.querySelector('.closeMenu');
const stars2 = document.querySelectorAll('.stars2 i');

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

// Rating Filter visual appearance
let lowerRating = 0;
let upperRating = 5;

stars.forEach((star, index1) => {
  let clickedStar = index1 + 1;
  star.addEventListener('click', () => {
    if (clickedStar > upperRating) {
      return;
    }
    if (clickedStar == lowerRating) {
      stars.forEach((star) => {
        star.classList.remove('active');
      });
      lowerRating = 0;
      return;
    }
    stars.forEach((star, index2) => {
      if (index1 > index2) {
        star.classList.add('active');
      } else if (index1 == index2) {
        star.classList.add('active');
        lowerRating = index1 + 1;
      } else {
        star.classList.remove('active');
      }
    });
  });
});

stars2.forEach((star, index1) => {
  let clickedStar = index1 + 1;
  star.addEventListener('click', () => {
    if (clickedStar < lowerRating) {
      return;
    }
    if (clickedStar == upperRating && lowerRating == 0) {
      stars2.forEach((star) => {
        star.classList.remove('active');
      });
      upperRating = 0;
      return;
    }
    stars2.forEach((star, index2) => {
      if (index1 > index2) {
        star.classList.add('active');
      } else if (index1 == index2) {
        star.classList.add('active');
        upperRating = index1 + 1;
      } else {
        star.classList.remove('active');
      }
    });
  });
});

class FilterByRating {
  filter(challengesContainer) {
    const challenges = challengesContainer.querySelectorAll(
      '.challenges-container__challenge'
    );
    for (let i = 0; i < challenges.length; i++) {
      let cardRating = challenges[i].querySelector('span').ariaValueNow;
      if (lowerRating <= cardRating && upperRating >= cardRating) {
        challenges[i].style.display = '';
      } else {
        challenges[i].style.display = 'none';
      }
    }
  }
}

// ███████████████ Starting point ███████████████ -------------------------------------------------------------------------

if (isOnChallengeSite) {
  const challengesContainer = document.querySelector(
    '.challenges-container.challenges-site'
  );
  let view = new ChallengeListView();
  view.render(challengesContainer);
  const starsContainer = document.querySelector('.starsContainer');
  if (starsContainer) {
    starsContainer.addEventListener('click', filterByRating);
  }
  function filterByRating() {
    new FilterByRating().filter(challengesContainer);
  }
  const filter = new ChallengeKeyFilter(challengesContainer);

  // Filter by tag starting point
  let viewTag = new Filter();

  // Buttons to filter by tag
  const linuxButton = new FilterButton('linuxTag', viewTag, 'linux');
  const webButton = new FilterButton('webTag', viewTag, 'web');
  const javascriptButton = new FilterButton(
    'javascriptTag',
    viewTag,
    'javascript'
  );
  const phreakingButton = new FilterButton(
    'phreakingTag',
    viewTag,
    'phreaking'
  );
  const bashButton = new FilterButton('bashTag', viewTag, 'bash');
  const sshButton = new FilterButton('sshTag', viewTag, 'ssh');
  const codingButton = new FilterButton('codingTag', viewTag, 'coding');
  const hackingButton = new FilterButton('hackingTag', viewTag, 'hacking');
  const ctfButton = new FilterButton('ctfTag', viewTag, 'ctf');
  const electronicsButton = new FilterButton(
    'electronicsTag',
    viewTag,
    'electronics'
  );

  // Filter by type
  const onlineCheckbox = new FilterButton('includeOnline', viewTag, 'online');
  const onsiteCheckbox = new FilterButton('includeOnsite', viewTag, 'onsite');
}

if (isOnMainPage) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
}
