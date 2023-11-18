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

const bookBtns = document.querySelectorAll('.challenges-container__challenge__button');
// Listener for button on mainpage
for (let index = 0; index < bookBtns.length; index++) {
  const element = bookBtns[index];
  element.addEventListener('click', createBookingPage);

}
// async function getdatesandtimes() {
//   let url = 'https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-3&challenge=3';
//   const res = await fetch(url);
//   const data= await res.json();
//   data.slots.forEach(slot => {
//     console.log(data);
//   })
//  };

//  getdatesandtimes();

// bookBtn.forEach(function (i) {
// i.addEventListener('click', createBookingPage)
// });




// bookBtn.addEventListener('click', createBookingPage);

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

// Function for actually creating elements
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


  // Could not set type attribute in createElment function.
  let bookingSceneContainer__DateInput = document.createElement('input');
  bookingSceneContainer__DateInput.setAttribute('type', 'date');
  bookingSceneContainer__section.appendChild(bookingSceneContainer__DateInput);




  // Creating second booking page.
  bookingSceneContainer__ContinueBtn.addEventListener('click', async () => {

    //Fetching api
    let dateval = bookingSceneContainer__DateInput.value;
    let fullUrl = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${dateval}&challenge=1`
    const result = await fetch(fullUrl);
    const data = await result.json();
    let availableTimes = data.slots;





    // Set first page css to noshow
    bookingSceneContainer__section.style.display = 'none';

    // Create Second page
    const bookingSceneContainer__SecondSection = createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
    bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

    const bookingScene__SecondRoomH1 = createElement('h1', null, 'bookingScene__SecondRoomH1Class', 'Book Room "Variable" (step 2)', null)
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);

    // Input guest name
    const bookingScene__SecondRoomLabelName = createElement('label', null, null, 'Name');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelName);

    const bookingScene__SecondRoomInputName = createElement('input', 'bookingScene__SecondRoomInputNameID', 'bookingScene__SecondRoomInputNameClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputName);

    // label connection to InputName
    bookingScene__SecondRoomLabelName.setAttribute('for', 'bookingScene__SecondRoomInputNameID');

    // Input Email
    const bookingScene__SecondRoomLabelEmail = createElement('label', null, null, 'E-mail');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomLabelEmail);

    const bookingScene__SecondRoomInputEmail = createElement('input', 'bookingScene__SecondRoomInputEmailID', 'bookingScene__SecondRoomInputEmailClass', null, 'text');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomInputEmail);

    // label connection to InputEmail
    bookingScene__SecondRoomLabelEmail.setAttribute('for', 'bookingScene__SecondRoomInputEmailID');

    // Iput timeSelect for Second section
    const bookingScene__SecondRoomSelectTime = createElement('select', 'bookingScene__SecondRoomSelectTimeID', 'bookingScene__SecondRoomSelectTimeID', null, null);
    bookingScene__SecondRoomSelectTime.setAttribute('name', 'availableTimes');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectTime);

    availableTimes.forEach(function (time, index) {
      const bookingScene__SecondRoomSelectTimeOption = document.createElement('option');
      bookingScene__SecondRoomSelectTimeOption.value = index;
      bookingScene__SecondRoomSelectTimeOption.text = time;

      bookingScene__SecondRoomSelectTime.appendChild(bookingScene__SecondRoomSelectTimeOption);

    })


    const bookingScene__SecondRoomSelectParticipants = createElement('select', 'bookingScene__SecondRoomSelectParticipantsID', 'bookingScene__SecondRoomSelectParticipantsClass', null, null);
    bookingScene__SecondRoomSelectTime.setAttribute('name', 'minMaxParticipants');
    bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomSelectParticipants);

    

    let minMaxPart = bookingScene__SecondRoomSelectParticipants.value;
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const participantsData = await res.json();
    
    participantsData.challenges.forEach( () => {

    }) 
      
    
    


  })
}





