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

/* Tested code for making mouse-over effect on stars but skipped it or now
stars.forEach((star, index1) => {
  star.addEventListener('mouseover', () => {
    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.style.color = 'green';
      } else {
        star.style.color = 'black';
      }
    });
  });
});
 */

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
