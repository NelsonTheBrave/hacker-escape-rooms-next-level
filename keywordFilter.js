export class ChallengeKeyFilter {
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

        // Check if other filters are active
        if (isVisible && this.tagFilter.hasActiveTags(challenge)) {
          challenge.style.display = '';
          anyChallengeVisible = true;
        } else {
          challenge.style.display = 'none';
        }
      }
    });
    //Show or not show the "no matching challenges"
    this.noMatchingChallenges.style.display = anyChallengeVisible ? 'none' : '';
  }
}
