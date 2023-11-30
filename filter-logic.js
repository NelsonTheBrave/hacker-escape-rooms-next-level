export class FilterLogic {
  constructor() {
  }
  run(filterInfo, container) {
    const challenges = container.querySelectorAll(
      '.challenges-container__challenge'
    );
    const noMatchesMessage = document.querySelector('.no-match-message');

    for (let i = 0; i < challenges.length; i++) {
      let challengeRating = challenges[i].querySelector('span').ariaValueNow;
      const challengeTitle = challenges[i].querySelector(
        '.challenges-container__challenge__title'
      ).textContent;
      const challengeText = challenges[i].querySelector(
        '.challenges-container__challenge__text'
      ).textContent;
      if (
        filterInfo.rating[0] <= challengeRating &&
        filterInfo.rating[1] >= challengeRating &&
        filterInfo.tagsAndType.every((tag) =>
          challenges[i].classList.contains(tag)
        ) &&
        (challengeText
          .toUpperCase()
          .includes(filterInfo.keyword.toUpperCase()) ||
          challengeTitle
            .toUpperCase()
            .includes(filterInfo.keyword.toUpperCase()))
      ) {
        challenges[i].style.display = '';
      } else {
        challenges[i].style.display = 'none';
      }
    }

    let visibleCount = 0;

    challenges.forEach((challenge) => {
      if (challenge.style.display == '') {
        visibleCount++;
      } else {
        return;
      }
    })
    if (visibleCount === 0) {
        noMatchesMessage.style.display = '';
    } else {
        noMatchesMessage.style.display = 'none';
    }
  }
}
