// ███████████████ MAIN JS ███████████████

// import { Challenge } from "./challenges.js";
const isOnMainPage = document.querySelector('.main-page');

// HTML elements
const stars = document.querySelectorAll('.stars i');
const filterDiv = document.querySelector('.filterDiv');
const filterButton = document.querySelector('.filterButton');
const closeMenu = document.querySelector('.closeMenu');
const stars2 = document.querySelectorAll('.stars2 i');
const navBar = document.querySelector('.navBar');

// Event listeners
document.querySelector('.navbar-button').addEventListener('click', openPopup);
visualViewport.onresize = closePopup;

//Event handlers
function openPopup() {
  document.querySelector('body').style.overflow = 'hidden';
  const html = document.querySelector('html');
  html.setAttribute('class', '--transparant');
  setTimeout(() => {
    html.classList.remove('--transparant');
    navBar.setAttribute('class', 'navBar--popup');
  }, 200);
  navBar.addEventListener('click', closePopup);
}

function closePopup(event) {
  if (
    event.target.nodeName === 'BUTTON' ||
    event.target.nodeName == 'A' ||
    event.target.width > 900
  ) {
    navBar.setAttribute('class', 'navBar');
    document.querySelector('body').style.overflow = 'auto';
  }
}

// Filter button and close filter
if (!isOnMainPage) {
filterButton.addEventListener('click', () => {
  filterDiv.style.display = 'block';
  filterButton.style.display = 'none';
});
closeMenu.addEventListener('click', () => {
  filterDiv.style.display = 'none';
  filterButton.style.display = 'block';
});}



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

// BOOKING MANAGER ---------------------------------------------------------
class BookingManager {
  constructor() {
    this.bookBtns = document.querySelectorAll('.challenges-container__challenge__button');
    this.bookBtns.forEach((bookingBtn) => {
      bookingBtn.addEventListener('click', () => this.createBookingPage());
    });


  }

  // Method for creating elements
  createElement(tagName, id, className, textContent, type) {
    let newElement = document.createElement(tagName);

    if (id) {
      newElement.id = id;
    }
    if (className) {
      newElement.className = className;
    }

    if (textContent) {
      newElement.textContent = textContent;
    }

    if (type) {
      newElement.type = type;
    }

    return newElement;
  }



  // Method for creating the modal
  async createBookingPage(challenge) {
    // Creating the modal, container is the same all the way through booking
    const bookingSceneContainer = this.createElement('div', 'bookingSceneContainer__Id', 'bookingSceneContainer__class', null)
    document.body.appendChild(bookingSceneContainer)
    // First Modal Section
    const bookingSceneContainer__section = this.createElement('section', 'bookingSceneContainer__SectionId', 'bookingSceneContainer__SectionClass', null)
    bookingSceneContainer.appendChild(bookingSceneContainer__section);
    //Titel for booking Room
    console.log(challenge.title);
    const bookingSceneContainer__h1 = this.createElement('h1', null, 'bookingSceneContainer__h1Class', `Book room ${challenge.title} (step 1)`, null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);
    // Arrival Paragraph
    const bookingSceneContainer__ArrivalText = this.createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);

    //Adding label for date element
    const bookingScene__DateInputLabel = this.createElement('label', null, 'datelabel', 'Date');
    bookingScene__DateInputLabel.setAttribute('for', 'bookingSceneContainer__DateInput');
    bookingSceneContainer__section.appendChild(bookingScene__DateInputLabel);
    // Could not set type attribute in createElment function. Creating date-option. 
    let bookingSceneContainer__DateInput = document.createElement('input');
    bookingSceneContainer__DateInput.setAttribute('type', 'date');
    bookingSceneContainer__DateInput.classList.add('dateInput');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__DateInput);

    // Continue button, when this button is clicked, data is fetched from api, data-participants and available times.
    const bookingSceneContainer__ContinueBtn = this.createElement('button', 'bookingSceneContainer__ContinueBtnID', 'bookingSceneContainer__ContinueBtnClass', 'Search available times', null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ContinueBtn);
  


    // Creating second modal-section
    bookingSceneContainer__ContinueBtn.addEventListener('click', async () => {

      // Fetching user date-input
      let selectedDate = bookingSceneContainer__DateInput.value;
      //Fetching available times and using user-input as template litral on YYYY-MM-DD on api-URL. 
      let fullUrl = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${challenge.id}`
      const resultDates = await fetch(fullUrl);
      const timesAndDateResult = await resultDates.json();
      let availableTimes = timesAndDateResult.slots;

      if (!selectedDate) {
        alert('Please choose a date');
        return;
      }

      //Creating second modul
      bookingSceneContainer__section.style.display = 'none';

      const bookingSceneContainer__SecondSection = this.createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
      bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

      const bookingScene__SecondRoomH1 = this.createElement('h1', null, 'bookingScene__SecondRoomH1Class', `Book Room ${challenge.title} (step 2)`, null)
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);

      // label connection to InputName
      const bookingScene__SecondRoomLabelName = this.createElement('label', null, 'userNameLabelClass', 'Name');
      bookingScene__SecondRoomLabelName.setAttribute('for', 'bookingScene__SecondRoomInputNameID');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelName);
      //Input guest name needs to be saved somewhere
      const bookingScene__SecondRoomInputName = this.createElement('input', 'bookingScene__SecondRoomInputNameID', 'bookingScene__SecondRoomInputNameClass', null, 'text');

      //Apending element

      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputName);



      // label connection to InputEmail, 
      const bookingScene__SecondRoomLabelEmail = this.createElement('label', null, 'E-MailClassLabel', 'E-mail');
      bookingScene__SecondRoomLabelEmail.setAttribute('for', 'bookingScene__SecondRoomInputEmailID');
      //Apending label
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelEmail);
      // Input Email needs to be saved somewhere
      const bookingScene__SecondRoomInputEmail = this.createElement('input', 'bookingScene__SecondRoomInputEmailID', 'bookingScene__SecondRoomInputEmailClass', null, 'text');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputEmail);


      //Creating select-element for timeselection,cant set attribute before creating selectElement. Something with the api fetch perhaps? Doable on the username/email elements.
      //Label Connection for Selecting time
      const bookingScene__SecondRoomSelectTimeLabel = this.createElement('label', null, 'SelectTimeClassLabel', 'What time?')
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTimeLabel);
      bookingScene__SecondRoomSelectTimeLabel.setAttribute('for', 'bookingScene__SecondRoomSelectTime');

      const bookingScene__SecondRoomSelectTime = this.createElement('select', 'bookingScene__SecondRoomSelectTimeID', 'bookingScene__SecondRoomSelectTimeClass', null, null);
      bookingScene__SecondRoomSelectTime.setAttribute('name', 'availableTimes');

      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTime);


      // availableTimes is  date.slots from API. forEach to create the availableTimes inside selectElement.
      availableTimes.forEach(function (time) {
        const bookingScene__SecondRoomSelectTimeOption = document.createElement('option');
        bookingScene__SecondRoomSelectTimeOption.value = time;
        bookingScene__SecondRoomSelectTimeOption.text = time;

        bookingScene__SecondRoomSelectTime.appendChild(bookingScene__SecondRoomSelectTimeOption);
      })

      //Creating select-element label for participants selection,cant set attribute before creating selectElement. Something with the api fetch perhaps? Doable on the username/email elements.
      const bookingScene__SecondRoomSelectParticipantsLabel = this.createElement('label', 'bookingScene__SecondRoomSelectParticipantslabelID', 'bookingScene__SecondRoomSelectParticipantslabelClass', 'How many participants?', null)
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipantsLabel);

      // Creating select-Element for max/min participants
      const bookingScene__SecondRoomSelectParticipants = this.createElement('select', 'bookingScene__SecondRoomSelectParticipantsID', 'bookingScene__SecondRoomSelectParticipantsClass', null, null);
      bookingScene__SecondRoomSelectParticipants.setAttribute('name', 'minMaxParticipants');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipants);
      bookingScene__SecondRoomSelectParticipantsLabel.setAttribute('for', 'bookingScene__SecondRoomSelectParticipantsID')

      // Creating Submit button
      const bookingSceneContainer__SecondRoomSubmitBtn = this.createElement('button', 'bookingSceneContainer__SecondRoomSubmitBtnID', 'bookingSceneContainer__SecondRoomSubmitBtnClass', 'Submit booking', null)
      bookingSceneContainer__SecondSection.appendChild(bookingSceneContainer__SecondRoomSubmitBtn);

      // Saving min/max-participants from challenge-class
      const minParticipants = challenge.minParticipants;
      const maxParticipants = challenge.maxParticipants;

      //Create array from objects min/max participants and using loop to push it to array.
      const challengeMinMaxPart = [];

      for (let i = minParticipants; i <= maxParticipants; i++) {
        challengeMinMaxPart.push(i);
      }
      //Create option element for each participant inside array.
      challengeMinMaxPart.forEach(participants => {

        const bookingSceneContainer__SecondRoomParticipantsOption = document.createElement('option');
        const participantsText = `${participants} Participants `;
        bookingSceneContainer__SecondRoomParticipantsOption.value = participants;
        bookingSceneContainer__SecondRoomParticipantsOption.text = participantsText;

        bookingScene__SecondRoomSelectParticipants.appendChild(bookingSceneContainer__SecondRoomParticipantsOption);
      })


      // Creating the last bookingScene and post data to api.
      bookingSceneContainer__SecondRoomSubmitBtn.addEventListener('click', async () => {

        const body = {
          date: selectedDate,
          name: bookingScene__SecondRoomInputName.value,
          email: bookingScene__SecondRoomInputEmail.value,
          challenge: challenge.id,
          participants: Number(bookingScene__SecondRoomSelectParticipants.value),
          time: bookingScene__SecondRoomSelectTime.value
        }
        console.log(body);
        const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(body)

        })

        const data = await res.json();
        console.log(data);

        bookingSceneContainer__SecondSection.style.display = "none";
        const bookingSceneContainer__LastSection = this.createElement('section', 'bookingSceneContainer__LastSectionID', 'bookingSceneContainer__LastSectionClass', null, null);
        bookingSceneContainer.appendChild(bookingSceneContainer__LastSection);
        const bookingSceneContainer__LastSectionh2 = this.createElement('h2', 'bookingSceneContainer__LastSectionh2ID', 'bookingSceneContainer__LastSectionh2Class', 'Thank You!', null);
        bookingSceneContainer__LastSection.appendChild(bookingSceneContainer__LastSectionh2);
        const bookingSceneContainer__LastSectionLink = this.createElement('a', 'bookingSceneContainer__LastSectionLinkID', 'bookingSceneContainer__LastSectionLinkClass', 'Back to challenges', null)
        bookingSceneContainer__LastSection.appendChild(bookingSceneContainer__LastSectionLink);
        bookingSceneContainer__LastSectionLink.href = 'challenges.html';
      })
    });
  }
}
// export const bookingManager = new BookingManager();


// ███████████████ CHALLENGE JS ███████████████

// import { bookingManager } from "./main.js";

const isOnChallengeSite = document.querySelector('.challenges-site');

// export class Challenge {

class Challenge {
  constructor(data) {
    this.data = data;
  }

  render() {
    let hej = this.data;
    const challengeCard = document.createElement('div');
    challengeCard.id = this.data.id;
    challengeCard.classList.add('challenges-container__challenge');
    challengeCard.classList.add(this.data.type);
    for (let i = 0; i < this.data.labels.length; i++) {
      challengeCard.classList.add(this.data.labels[i]);
    }

    const img = document.createElement('img');
    img.classList.add('challenges-container__challenge__img');
    img.src = this.data.image + '?image=' + Math.floor(Math.random() * 16);
    challengeCard.append(img);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('challenges-container__challenge__lowerWrapper');
    challengeCard.append(wrapperDiv);

    const title = document.createElement('h3');
    title.classList.add('challenges-container__challenge__title');
    title.textContent = this.data.title;
    wrapperDiv.append(title);

    const type = document.createElement('h3');
    type.classList.add('challenges-container__challenge__type');
    type.textContent = '(' + this.data.type + ')';
    wrapperDiv.append(type);

    const ratingContainer = document.createElement('small');
    ratingContainer.classList.add('challenges-container__challenge__rating');
    wrapperDiv.append(ratingContainer);

    const rating = document.createElement('span');
    rating.classList.add('challenges-container__challenge__rating__stars');
    rating.ariaLabel = 'Rating';
    rating.role = 'meter';
    rating.ariaValueMin = '0';
    rating.ariaValueMax = '5';
    rating.ariaValueNow = this.data.rating;
    ratingContainer.append(rating);

    function addStar(starRating, starNumber) {
      const newStar = document.createElement('i');
      newStar.classList.add('fa');
      if (starRating < starNumber - 0.5) {
        newStar.classList.add('fa-star-o');
      } else if (starRating === starNumber - 0.5) {
        newStar.classList.add('fa-star-half-o');
      } else {
        newStar.classList.add('fa-star');
      }
      newStar.ariaHidden = true;
      rating.append(newStar);
    }

    for (let i = 1; i < 6; i++) {
      addStar(this.data.rating, i);
    }

    const participants = document.createElement('span');
    participants.classList.add(
      'challenges-container__challenge__rating__participants'
    );
    participants.textContent =
      this.data.minParticipants === this.data.maxParticipants
        ? `${this.data.minParticipants} participants`
        : `${this.data.minParticipants}-${this.data.maxParticipants} participants`;
    ratingContainer.append(participants);

    const challengeText = document.createElement('p');
    challengeText.classList.add('challenges-container__challenge__text');
    challengeText.textContent = this.data.description;
    wrapperDiv.append(challengeText);

    const challengeButton = document.createElement('button');
    challengeButton.classList.add('challenges-container__challenge__button');
    challengeButton.textContent =
      this.data.type === 'online' ? 'Take challenge online' : 'Book this room';
    wrapperDiv.append(challengeButton);
    challengeButton.addEventListener('click', bookingManager);
      function bookingManager() {
        new BookingManager().createBookingPage(hej);
      } 

      
    return challengeCard;
  }
}


class APIAdapter {
  async getChallenges() {
    const res = await fetch(
      'https://lernia-sjj-assignments.vercel.app/api/challenges'
    );
    const payload = await res.json();

    return payload.challenges.map(
      (challengeData) => new Challenge(challengeData)
    );
  }
}

class ChallengeListView {
  async render(container) {
    const api = new APIAdapter();
    const challenges = await api.getChallenges();

    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();

      container.append(element);
    }
  }
}

class TopThreeView {
  async render(container) {
    const challenges = await new APIAdapter().getChallenges();
    const challengesSortedByRating = challenges.sort(
      (a, b) => b.data.rating - a.data.rating
    );
    for (let i = 0; i < 3; i++) {
      const challenge = challengesSortedByRating[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}
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
class ChallengeKeyFilter {
  constructor(challengesContainer) {
    this.input = document.getElementById('textFilter');
    this.challengesContainer = challengesContainer;
    //create the no challenges message
    this.noMatchingChallenges = document.createElement('h1');
    this.noMatchingChallenges.classList.add('no-match-message');
    this.noMatchingChallenges.textContent = 'No matching challenges';
    this.noMatchingChallenges.style.display = 'none';
    this.challengesContainer.appendChild(this.noMatchingChallenges);
    this.input.addEventListener('input', this.keyFilter.bind(this));
  }
  // get the input
  keyFilter() {
    const filter = this.input.value.toUpperCase();
    const challenges = this.challengesContainer.querySelectorAll(
      '.challenges-container__challenge'
    );
    let anyChallengeVisible = false;
    challenges.forEach((challenge) => {
      const title = challenge.querySelector(
        '.challenges-container__challenge__title'
      );
      const infoText = challenge.querySelector(
        '.challenges-container__challenge__text'
      );
      if (title && infoText) {
        const titleText = title.textContent || title.innerHTML;
        const textContent = infoText.textContent || infoText.innerText;
        const isVisible =
          titleText.toUpperCase().includes(filter) ||
          textContent.toUpperCase().includes(filter);
        challenge.style.display = isVisible ? '' : 'none';
        if (isVisible) {
          anyChallengeVisible = true;
        }
      }
    });
    //Show or not show the "no matching challenges"
    this.noMatchingChallenges.style.display = anyChallengeVisible ? 'none' : '';
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
}

if (!isOnChallengeSite) {
  const topThreeContainer = document.querySelector(
    '.challenges-container.main-page'
  );
  new TopThreeView().render(topThreeContainer);
}
