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

  // Skapa en variabel som hämtar användarens klick på ett kort? Hitta kortets unika ID och stoppa den i parametern.


  async createBookingPage(challenge) {
    // Creating the modal, container is the same all the way through booking
    const bookingSceneContainer = this.createElement('div', 'bookingSceneContainer__Id', 'bookingSceneContainer__class', null)
    document.body.appendChild(bookingSceneContainer)
    // Modal Section
    const bookingSceneContainer__section = this.createElement('section', 'bookingSceneContainer__SectionId', 'bookingSceneContainer__SectionClass', null)
    bookingSceneContainer.appendChild(bookingSceneContainer__section);
    //Titel for booking Room
    const bookingSceneContainer__h1 = this.createElement('h1', null, 'bookingSceneContainer__h1Class', `Book room ${challenge.title} (step 1)`, null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);

    const bookingSceneContainer__ArrivalText = this.createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);

    const bookingSceneContainer__ContinueBtn = this.createElement('button', 'bookingSceneContainer__ContinueBtnID', 'bookingSceneContainer__ContinueBtnClass', 'Search available times', null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ContinueBtn);

    //Adding label for date element
    const bookingScene__DateInputLabel = this.createElement('label', null, null, 'Date');
    bookingScene__DateInputLabel.setAttribute('for', 'bookingSceneContainer__DateInput');
    bookingSceneContainer__section.appendChild(bookingScene__DateInputLabel);
    // Could not set type attribute in createElment function. Creating date-option. When ContinueBtn is clicked data is fetcehd from API.
    let bookingSceneContainer__DateInput = document.createElement('input');
    bookingSceneContainer__DateInput.setAttribute('type', 'date');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__DateInput);





    // Creating second page and fetchin api.data

    bookingSceneContainer__ContinueBtn.addEventListener('click', async () => {
      let selectedDate = bookingSceneContainer__DateInput.value;

      if (!selectedDate) {
        alert('Please choose a date');
        return;
      }

      console.log(challenge);
      let fullUrl = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${challenge.id}`
      const resultDates = await fetch(fullUrl);
      const timesAndDateResult = await resultDates.json();
      let availableTimes = timesAndDateResult.slots;



      //Creating second modul
      bookingSceneContainer__section.style.display = 'none';

      const bookingSceneContainer__SecondSection = this.createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
      bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

      const bookingScene__SecondRoomH1 = this.createElement('h1', null, 'bookingScene__SecondRoomH1Class', `Book Room ${challenge.title} (step 2)`, null)
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);

      // label connection to InputName
      const bookingScene__SecondRoomLabelName = this.createElement('label', null, 'userNameClass', 'Name');
      bookingScene__SecondRoomLabelName.setAttribute('for', 'bookingScene__SecondRoomInputNameID');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelName);
      //Input guest name needs to be saved somewhere
      const bookingScene__SecondRoomInputName = this.createElement('input', 'bookingScene__SecondRoomInputNameID', 'bookingScene__SecondRoomInputNameClass', null, 'text');

      //Apending element

      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputName);



      // label connection to InputEmail, 
      const bookingScene__SecondRoomLabelEmail = this.createElement('label', null, 'E-MailClass', 'E-mail');
      bookingScene__SecondRoomLabelEmail.setAttribute('for', 'bookingScene__SecondRoomInputEmailID');
      //Apending label
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelEmail);
      // Input Email needs to be saved somewhere
      const bookingScene__SecondRoomInputEmail = this.createElement('input', 'bookingScene__SecondRoomInputEmailID', 'bookingScene__SecondRoomInputEmailClass', null, 'text');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputEmail);


      //Creating select-element for timeselection,cant set attribute before creating selectElement. Something with the api fetch perhaps? Doable on the username/email elements.
      //Label Connection for Selecting time
      const bookingScene__SecondRoomSelectTimeLabel = this.createElement('label', null, 'SelectTimeClass', 'What time?')
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTimeLabel);
      bookingScene__SecondRoomSelectTimeLabel.setAttribute('for', 'bookingScene__SecondRoomSelectTimeID');

      const bookingScene__SecondRoomSelectTime = this.createElement('select', 'bookingScene__SecondRoomSelectTimeID', 'bookingScene__SecondRoomSelectTimeID', null, null);
      bookingScene__SecondRoomSelectTime.setAttribute('name', 'availableTimes');
      
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTime);


      // availableTimes is  date.slots from API. forEach to create the availableTimes inside selectElement.
      availableTimes.forEach(function (time) {
        const bookingScene__SecondRoomSelectTimeOption = document.createElement('option');
        bookingScene__SecondRoomSelectTimeOption.value = time;
        bookingScene__SecondRoomSelectTimeOption.text = time;

        bookingScene__SecondRoomSelectTime.appendChild(bookingScene__SecondRoomSelectTimeOption);
      })

      //Creating select-element for participants selection,cant set attribute before creating selectElement. Something with the api fetch perhaps? Doable on the username/email elements.
      const bookingScene__SecondRoomSelectParticipantsLabel = this.createElement('label', null, 'bookingScene__SecondRoomSelectParticipantslabelID', 'How many participants?', null)
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipantsLabel);

      // Creating select-Element for max/min participants
      const bookingScene__SecondRoomSelectParticipants = this.createElement('select', 'bookingScene__SecondRoomSelectParticipantsID', 'bookingScene__SecondRoomSelectParticipantsClass', null, null);
      bookingScene__SecondRoomSelectParticipants.setAttribute('name', 'minMaxParticipants');
      bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipants);
      bookingScene__SecondRoomSelectParticipantsLabel.setAttribute('for', 'bookingScene__SecondRoomSelectParticipantsID')

      // Creating Submit button
      const bookingSceneContainer__SecondRoomSubmitBtn = this.createElement('button', 'bookingSceneContainer__SecondRoomSubmitBtnID', 'bookingSceneContainer__SecondRoomSubmitBtnClass', 'Submit', null)
      bookingSceneContainer__SecondSection.appendChild(bookingSceneContainer__SecondRoomSubmitBtn);

      // creating array for min-max selection in select-element.
      // FirstChallenge = first-challange from API. Need to link this to wichever challenge user is choosing.
      const minParticipants = challenge.minParticipants;
      const maxParticipants = challenge.maxParticipants;

      const challengeMinMaxPart = Array.from({ length: maxParticipants - minParticipants + 1 }, (_, index) => minParticipants + index);

      challengeMinMaxPart.forEach(participants => {
        const bookingSceneContainer__SecondRoomParticipantsOption = document.createElement('option');
        bookingSceneContainer__SecondRoomParticipantsOption.value = participants;
        bookingSceneContainer__SecondRoomParticipantsOption.text = participants;
        bookingScene__SecondRoomSelectParticipants.appendChild(bookingSceneContainer__SecondRoomParticipantsOption);
      })



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
        // Creating the last bookingScene
        bookingSceneContainer__SecondSection.style.display = "none";
        const bookingSceneContainer__LastSection = this.createElement('div', 'bookingSceneContainer__LastSectionID', 'bookingSceneContainer__LastSectionClass', null, null);
        bookingSceneContainer.appendChild(bookingSceneContainer__LastSection);
        const bookingSceneContainer__LastSectionh2 = this.createElement('h2', 'bookingSceneContainer__LastSectionh2ID', 'bookingSceneContainer__LastSectionh2Class', 'Thank You!', null);
        bookingSceneContainer__LastSection.appendChild(bookingSceneContainer__LastSectionh2);
        const bookingSceneContainer__LastSectionLink = this.createElement('a', 'bookingSceneContainer__LastSectionLinkID', 'bookingSceneContainer__LastSectionLinkClass', 'back to challenges', null)
        bookingSceneContainer__LastSection.appendChild(bookingSceneContainer__LastSectionLink);
        bookingSceneContainer__LastSectionLink.href = 'challenges.html';


      })


    });



  }
}


// init() {
// this.bookBtns.forEach((bookingBtn) => {
// bookingBtn.addEventListener('click', () => this.createBookingPage());
// });
// Usage
// bookingManager.init();
export const bookingManager = new BookingManager();

// Variables


