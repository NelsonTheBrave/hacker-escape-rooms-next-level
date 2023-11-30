export class FilterLogic {
  constructor() {
    console.log('mamma');
  }
  run(filterInfo) {
    console.log('Filtered!');
    console.log(filterInfo);

    const challenges = document.querySelectorAll(
      '.challenges-container__challenge'
    );
    for (let i = 0; i < challenges.length; i++) {
      let cardRating = challenges[i].querySelector('span').ariaValueNow;
      if (filterInfo.rating[0] <= cardRating && filterInfo.rating[1] >= cardRating) {
        challenges[i].style.display = '';
      } else {
        challenges[i].style.display = 'none';
      }
    }
  }
} // End of class
