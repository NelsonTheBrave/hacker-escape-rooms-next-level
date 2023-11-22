// Variables

// const { userInfo } = require("os");

// HTML elements
// const stars = document.querySelectorAll(".stars i");
// const filterDiv = document.querySelector(".filterDiv");
// const filterButton = document.querySelector(".filterButton");
// const closeMenu = document.querySelector(".closeMenu");
// const stars2 = document.querySelectorAll(".stars2 i");
// const navBar = document.querySelector(".navBar");

// // Event listeners
// document.querySelector(".navbar-button").addEventListener("click", openPopup);
// visualViewport.onresize = closePopup;

// //Event handlers
// function openPopup() {
//   document.querySelector("body").style.overflow = "hidden";
//   const html = document.querySelector("html");
//   html.setAttribute("class", "--transparant");
//   setTimeout(() => {
//     html.classList.remove("--transparant");
//     navBar.setAttribute("class", "navBar--popup");
//   }, 200);
//   navBar.addEventListener("click", closePopup);
// }

// function closePopup(event) {
//   if (
//     event.target.nodeName === "BUTTON" ||
//     event.target.nodeName == "A" ||
//     event.target.width > 900
//   ) {
//     navBar.setAttribute("class", "navBar");
//     document.querySelector("body").style.overflow = "auto";
//   }
// }

// // Filter button and close filter
// filterButton.addEventListener("click", () => {
//   filterDiv.style.display = "block";
//   filterButton.style.display = "none";
// });
// closeMenu.addEventListener("click", () => {
//   filterDiv.style.display = "none";
//   filterButton.style.display = "block";
// });

// // Function for adding and removing stars

// stars.forEach((star, index1) => {
//   star.addEventListener("click", () => {
//     stars.forEach((star, index2) => {
//       index1 >= index2
//         ? star.classList.add("active")
//         : star.classList.remove("active");
//     });
//   });
// });

// stars2.forEach((star, index1) => {
//   star.addEventListener("click", () => {
//     stars2.forEach((star, index2) => {
//       index1 >= index2
//         ? star.classList.add("active")
//         : star.classList.remove("active");
//     });
//   });
// });




// Modal code needs to be linked to buttonS.
/*/
const bookBtns = document.querySelectorAll('.challenges-container__challenge__button');
// Listener for button on mainpage
for (let index = 0; index < bookBtns.length; index++) {
  const bookingBtns = bookBtns[index];
  bookingBtns.addEventListener('click', createBookingPage);

}


// function for creating elements
function createElement(tagName, id, className, textContent, type) {
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

  if (type)
    newElement.type = type;



  return newElement;


}

// Function for actually creating elements getting API etc.
function createBookingPage() {

  //Elements creating Modal
  const bookingSceneContainer = createElement('div', 'bookingSceneContainer__Id', 'bookingSceneContainer__class', null)
  document.body.appendChild(bookingSceneContainer)

  const bookingSceneContainer__section = createElement('section', 'bookingSceneContainer__SectionId', 'bookingSceneContainer__SectionClass', null)
  bookingSceneContainer.appendChild(bookingSceneContainer__section);

  const bookingSceneContainer__h1 = createElement('h1', null, 'bookingSceneContainer__h1Class', 'Book room "Variabel" (step 1) ');
  bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);

  const bookingSceneContainer__ArrivalText = createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
  bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);

  const bookingSceneContainer__ContinueBtn = createElement('button', 'bookingSceneContainer__ContinueBtnID', 'bookingSceneContainer__ContinueBtnClass', 'Search available times', null)
  bookingSceneContainer__section.appendChild(bookingSceneContainer__ContinueBtn);


  // Could not set type attribute in createElment function. Creating date-option. When ContinueBtn is clicked data is fetcehd from API.
  let bookingSceneContainer__DateInput = document.createElement('input');
  bookingSceneContainer__DateInput.setAttribute('type', 'date');
  bookingSceneContainer__section.appendChild(bookingSceneContainer__DateInput);




  // Creating second booking page.
  bookingSceneContainer__ContinueBtn.addEventListener('click', async () => {
    //Fetching date and Timeslots Api
    let availableDates = bookingSceneContainer__DateInput.value;
    let fullUrl = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${availableDates}&challenge=1`
    const resultDates = await fetch(fullUrl);
    const timesAndDateResult = await resultDates.json();
    let availableTimes = timesAndDateResult.slots;

    //Fetching card ID and min/max participants API

    const resultChallenge = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const challengeData = await resultChallenge.json();


  
    // Set first page css to display none
    bookingSceneContainer__section.style.display = 'none';

    // Create Second modal-page
    const bookingSceneContainer__SecondSection = createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
    bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

    const bookingScene__SecondRoomH1 = createElement('h1', null, 'bookingScene__SecondRoomH1Class', 'Book Room "Variable" (step 2)', null)
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);

    // Input guest name needs to be saved somewhere
    const bookingScene__SecondRoomLabelName = createElement('label', null, null, 'Name');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelName);

    const bookingScene__SecondRoomInputName = createElement('input', 'bookingScene__SecondRoomInputNameID', 'bookingScene__SecondRoomInputNameClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputName);

    // label connection to InputName
    bookingScene__SecondRoomLabelName.setAttribute('for', 'bookingScene__SecondRoomInputNameID');

    // Input Email needs to be saved somewhere
    const bookingScene__SecondRoomLabelEmail = createElement('label', null, null, 'E-mail');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelEmail);

    const bookingScene__SecondRoomInputEmail = createElement('input', 'bookingScene__SecondRoomInputEmailID', 'bookingScene__SecondRoomInputEmailClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputEmail);

    // label connection to InputEmail, 
    bookingScene__SecondRoomLabelEmail.setAttribute('for', 'bookingScene__SecondRoomInputEmailID');

    // Iput timeSelect for Second section
    const bookingScene__SecondRoomSelectTime = createElement('select', 'bookingScene__SecondRoomSelectTimeID', 'bookingScene__SecondRoomSelectTimeID', null, null);
    bookingScene__SecondRoomSelectTime.setAttribute('name', 'availableTimes');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTime);

    // availableTimes is  date.slots from API.
    availableTimes.forEach(function (time, index) {
      const bookingScene__SecondRoomSelectTimeOption = document.createElement('option');
      bookingScene__SecondRoomSelectTimeOption.value = index;
      bookingScene__SecondRoomSelectTimeOption.text = time;

      bookingScene__SecondRoomSelectTime.appendChild(bookingScene__SecondRoomSelectTimeOption);
      console.log(index, time);

    })

    // Creating select-Element for max/min participants
    const bookingScene__SecondRoomSelectParticipants = createElement('select', 'bookingScene__SecondRoomSelectParticipantsID', 'bookingScene__SecondRoomSelectParticipantsClass', null, null);
    bookingScene__SecondRoomSelectParticipants.setAttribute('name', 'minMaxParticipants');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipants);



    // creating array for min-max selection in select-element.
    // FirstChallenge = first-challange from API. Need to link this to wichever challenge user is choosing.
    firstChallenge = challengeData.challenges[0];
    const minParticipants = firstChallenge.minParticipants
    const maxParticipants = firstChallenge.maxParticipants

    const challengeMinMaxPart = Array.from({ length: maxParticipants - minParticipants + 1 }, (_, index) => minParticipants + index);

    challengeMinMaxPart.forEach(participants => {
      const bookingSceneContainer__SecondRoomParticipantsOption = document.createElement('option');
      bookingSceneContainer__SecondRoomParticipantsOption.value = participants;
      bookingSceneContainer__SecondRoomParticipantsOption.text = participants;
      bookingScene__SecondRoomSelectParticipants.appendChild(bookingSceneContainer__SecondRoomParticipantsOption);


    })

    console.log(firstChallenge);









  })
}


/*/




// 
class BookingManager {
  constructor() {
    this.bookBtns = document.querySelectorAll('.challenges-container__challenge__button');
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



  async createBookingPage() {
// Creating the modal
    const bookingSceneContainer = this.createElement('div', 'bookingSceneContainer__Id', 'bookingSceneContainer__class', null)
    document.body.appendChild(bookingSceneContainer)
  
    const bookingSceneContainer__section = this.createElement('section', 'bookingSceneContainer__SectionId', 'bookingSceneContainer__SectionClass', null)
    bookingSceneContainer.appendChild(bookingSceneContainer__section);
  
    const bookingSceneContainer__h1 = this.createElement('h1', null, 'bookingSceneContainer__h1Class', 'Book room "Variabel" (step 1) ');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);
  
    const bookingSceneContainer__ArrivalText = this.createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);
  
    const bookingSceneContainer__ContinueBtn = this.createElement('button', 'bookingSceneContainer__ContinueBtnID', 'bookingSceneContainer__ContinueBtnClass', 'Search available times', null)
    bookingSceneContainer__section.appendChild(bookingSceneContainer__ContinueBtn);
    
    // Could not set type attribute in createElment function. Creating date-option. When ContinueBtn is clicked data is fetcehd from API.
    let bookingSceneContainer__DateInput = document.createElement('input');
    bookingSceneContainer__DateInput.setAttribute('type', 'date');
    bookingSceneContainer__section.appendChild(bookingSceneContainer__DateInput);

    // Creating second page and fetchin api.data
    bookingSceneContainer__ContinueBtn.addEventListener('click', async () => {
      let availableDates = bookingSceneContainer__DateInput.value;
      let fullUrl = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${availableDates}&challenge=3`
      const resultDates = await fetch(fullUrl);
      const timesAndDateResult = await resultDates.json();
      let availableTimes = timesAndDateResult.slots;

      // challenges api-data
      const resultChallenge = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
      const challengeData = await resultChallenge.json();
      console.log(challengeData);
      //Creating second modul
      bookingSceneContainer__section.style.display = 'none';

    const bookingSceneContainer__SecondSection = this.createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
    bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

    const bookingScene__SecondRoomH1 = this.createElement('h1', null, 'bookingScene__SecondRoomH1Class', 'Book Room "Variable" (step 2)', null)
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);

    // Input guest name needs to be saved somewhere
    const bookingScene__SecondRoomLabelName = this.createElement('label', null, null, 'Name');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelName);

    const bookingScene__SecondRoomInputName = this.createElement('input', 'bookingScene__SecondRoomInputNameID', 'bookingScene__SecondRoomInputNameClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputName);
    const guestName = bookingScene__SecondRoomInputName.value;
    console.log(guestName);

    // label connection to InputName
    bookingScene__SecondRoomLabelName.setAttribute('for', 'bookingScene__SecondRoomInputNameID');

    // Input Email needs to be saved somewhere
    const bookingScene__SecondRoomLabelEmail = this.createElement('label', null, null, 'E-mail');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelEmail);

    const bookingScene__SecondRoomInputEmail = this.createElement('input', 'bookingScene__SecondRoomInputEmailID', 'bookingScene__SecondRoomInputEmailClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputEmail);

    // label connection to InputEmail, 
    bookingScene__SecondRoomLabelEmail.setAttribute('for', 'bookingScene__SecondRoomInputEmailID');

    // Iput timeSelect for Second section
    const bookingScene__SecondRoomSelectTime = this.createElement('select', 'bookingScene__SecondRoomSelectTimeID', 'bookingScene__SecondRoomSelectTimeID', null, null);
    bookingScene__SecondRoomSelectTime.setAttribute('name', 'availableTimes');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTime);

    // availableTimes is  date.slots from API.
    availableTimes.forEach(function (time, index) {
      const bookingScene__SecondRoomSelectTimeOption = document.createElement('option');
      bookingScene__SecondRoomSelectTimeOption.value = index;
      bookingScene__SecondRoomSelectTimeOption.text = time;

      bookingScene__SecondRoomSelectTime.appendChild(bookingScene__SecondRoomSelectTimeOption);

    })

    // Creating select-Element for max/min participants
    const bookingScene__SecondRoomSelectParticipants = this.createElement('select', 'bookingScene__SecondRoomSelectParticipantsID', 'bookingScene__SecondRoomSelectParticipantsClass', null, null);
    bookingScene__SecondRoomSelectParticipants.setAttribute('name', 'minMaxParticipants');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipants);

    // creating array for min-max selection in select-element.
    // FirstChallenge = first-challange from API. Need to link this to wichever challenge user is choosing.
    const firstChallenge = challengeData.challenges[3];
    const minParticipants = firstChallenge.minParticipants;
    const maxParticipants = firstChallenge.maxParticipants;

    const challengeMinMaxPart = Array.from({ length: maxParticipants - minParticipants + 1 }, (_, index) => minParticipants + index);

    challengeMinMaxPart.forEach(participants => {
      const bookingSceneContainer__SecondRoomParticipantsOption = document.createElement('option');
      bookingSceneContainer__SecondRoomParticipantsOption.value = participants;
      bookingSceneContainer__SecondRoomParticipantsOption.text = participants;
      bookingScene__SecondRoomSelectParticipants.appendChild(bookingSceneContainer__SecondRoomParticipantsOption);


    })
    
    const bookingSceneContainer__SecondRoomSubmitBtn = this.createElement('button', 'bookingSceneContainer__SecondRoomSubmitBtnID', 'bookingSceneContainer__SecondRoomSubmitBtnClass', 'Submit', null)
    bookingSceneContainer__SecondSection.appendChild(bookingSceneContainer__SecondRoomSubmitBtn);
    } );


   
  }

  init() {
    this.bookBtns.forEach((bookingBtn) => {
    bookingBtn.addEventListener('click', () => this.createBookingPage());
    });

   
  }
}

// Usage
const bookingManager = new BookingManager();
bookingManager.init();
