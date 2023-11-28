import { Challenge } from "./challenges.js";





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
    const bookingSceneContainer__h1 = this.createElement('h1', null, 'bookingSceneContainer__h1Class', `Book room ${challenge.title} (step 1)`, null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);
    // Arrival Paragraph
    const bookingSceneContainer__ArrivalText = this.createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);
  console.log(challenge);

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

export const bookingManager = new BookingManager();
// init() {
// this.bookBtns.forEach((bookingBtn) => {
// bookingBtn.addEventListener('click', () => this.createBookingPage());
// });
// Usage
// bookingManager.init();

// HTML elements





