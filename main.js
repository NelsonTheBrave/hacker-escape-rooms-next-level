// Variables
const navBar = document.querySelector(".navBar");

// Event listeners
document.querySelector(".navbar-button").addEventListener("click", openPopup);
visualViewport.onresize = closePopup;

//Event handlers
function openPopup() {
  document.querySelector("body").style.overflow = "hidden";
  const html = document.querySelector("html");
  html.setAttribute("class", "--transparant");
  setTimeout(() => {
    html.classList.remove("--transparant");
    navBar.setAttribute("class", "navBar--popup");
  }, 200);
  navBar.addEventListener("click", closePopup);
}

function closePopup(event) {
  if (
    event.target.nodeName === "BUTTON" ||
    event.target.nodeName == "A" ||
    event.target.width > 900
  ) {
    navBar.setAttribute("class", "navBar");
    document.querySelector("body").style.overflow = "auto";
  }
}
// pull request test

stars = document.querySelectorAll(".stars i");
console.log(stars);

stars2 = document.querySelectorAll(".stars2 i");
console.log(stars2);

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});

stars2.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars2.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});



// Modal code needs to be linked to buttonS.

const bookBtn = document.querySelector('.challenges-container__challenge__button');


// function for creating elements
function createElement(tagName, id, className, textContent, type) {
    let newElement = document.createElement(tagName);
    
    if (id) {
        newElement.id =id;
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

const bookingSceneContainer__section = createElement('section', 'bookingSceneContainer__SectionId', 'bookingSceneContainer__SectionClass', null )
bookingSceneContainer.appendChild(bookingSceneContainer__section);

const bookingSceneContainer__h1 = createElement('h1', null, 'bookingSceneContainer__h1Class', 'Book room "Variabel" (step 1) ');
bookingSceneContainer__section.appendChild(bookingSceneContainer__h1);

const bookingSceneContainer__ArrivalText = createElement('p', null, 'bookingSceneContainer__ArrivalTextClass', 'What date would you like to come?');
bookingSceneContainer__section.appendChild(bookingSceneContainer__ArrivalText);

const bookingSceneContainer__ContinueBtn = createElement('button', 'bookingSceneContainer__ContinueBtnID', 'bookingSceneContainer__ContinueBtnClass', 'Search available times', null)
bookingSceneContainer__section.appendChild(bookingSceneContainer__ContinueBtn);


// Could not set type attribute in createElment function.
let bookingSceneContainer__TimeInput = document.createElement('input');
bookingSceneContainer__TimeInput.setAttribute('type', 'date');
bookingSceneContainer__section.appendChild(bookingSceneContainer__TimeInput);

// Creating second booking page.
bookingSceneContainer__ContinueBtn.addEventListener('click', () => {

  bookingSceneContainer__section.style.display = 'none';

  const bookingSceneContainer__SecondSection = createElement('div', 'bookingSceneContainer__SecondSectionID', 'bookingSceneContainer__SecondSectionClass', null, null);
  bookingSceneContainer.appendChild(bookingSceneContainer__SecondSection);

  const bookingScene__SecondRoomH1 = createElement('h1', null, 'bookingScene__SecondRoomH1Class', 'Book Room "Variable" (step 2)', null)
  bookingSceneContainer__SecondSection.appendChild(bookingScene__SecondRoomH1);
  


});

}

// Listener for button on mainpage
bookBtn.addEventListener('click', createBookingPage);





