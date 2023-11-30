import { TopThreeView } from './challenges.js';
import { ChallengeListView } from './challenges.js';
import { Filter } from './filterByTag.js';
import { FilterButton } from './filterByTag.js';
import { openPopup } from './mobile-menu.js';
import { ChallengeKeyFilter } from './keywordFilter.js';
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
  const starsContainer = document.querySelector('.starsContainer');
  const filter = new ChallengeKeyFilter(challengesContainer);
  new FilterUI().render();
  // const filterLogic = new FilterLogic;

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





/* // FILTER ------------------------------------------------------------------------------

class FilterUI {
  constructor() {
  this.filterInfo = {
  tagsAndType: [""],
  rating: [0,5],
  keyword: ""
};

// Möjligen att detta är det enda i konstruktorn, och att man skapar UI-funktionalitet med metoder...?

  


// Tags and type UI - skapar eventlisteners på knappar som lägger till och tar bort i this.filterInfo
// typ 
let tagAndTypButtons = document.querySelectorAll('.tagButton');
tagAndTypButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (this.filterInfo.tagsAndType.includes(button.id)) {
      this.filterInfo.tagsAndType.remove(button.id) // eller nåt
    } else { this.filterInfo.tagsAndType.push(button.id)};
    filter();
  })
}) 


//Rinse and repeat more or less for type-buttons...?

let textFilterInput = document.querySelector('#textFilter');
textFilterInput.addEventListener('input', () => {
  this.filterInfo.keyword = textFilterInput.value;
  filterFunction.filter(this.filterInfo);
})
}











filter(challengesContainer) {
  const challenges = challengesContainer.querySelectorAll(
    '.challenges-container__challenge'
  );

  for (let i = 0; i < challenges.length; i++) {
    let cardRating = challenges[i].querySelector('span').ariaValueNow;







    
    
    if (this.filterInfo.rating[0] <= cardRating && this.filterInfo.rating[1] >= cardRating
      && this.filterInfo.tags.every((tag) => card.classList.contains(tag))
      && titleText.toUpperCase().includes(this.filterInfo.keyword) 
      && textContent.toUpperCase().includes(this.filterInfo.keyword)) 
       {
      challenges[i].style.display = '';
    } else {
      challenges[i].style.display = 'none';
    }
  }
  challenges.forEach((challenge) => { //checks all cards in DOM if any card is visible, if none are, display message
    if (challenge.style.visibility = '') {
      return 
    } else {
      // display message that there are no matching results!
    }
  })
}
}





// ALternativt egen klass för filtreringen
class FilterFunction {


  filter(filterInfo) {
    if (filterInfo.tagsAndType == "linux") {
      console.log('Do some shit');
    }
  }


}











/* 
SKISS FÖR FILTER

entry point skapar en filterknapp

knappen öppnar filter-UI som är en klass/typ av objekt, dvs new FilterUI

FilterUI {
skapar grejer för stjärnor, tagsknappar, type, och keyword

sparar i ett objekt
let filterInfo = {};
filterInfo = {
  type: "onsite",
  tags: ["linux", "hacking"],
  rating: [1,5],
  keyword: "Little weird guy"
}

skickar info till new FilterMaster().doIt(), eller metod inom detta objekt
filter(filterInfo);


filter(filterInfo) {

här i körs alla våra filtrerande funktioner, 
alltså typ filterTags()-motsvarande, mitt rating, och keyword, bara att de använder sin info från filterInfo


}


}











 */