class Challenge {
  constructor(data) {
    this.data = data;
  }

  render() {
    const challengeCard = document.createElement('div');
    challengeCard.id = this.data.id;
    challengeCard.classList.add('challenges-container__challenge');
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

// Starting point
const challengesContainer = document.querySelector('.challenges-container');

let view = new ChallengeListView();
view.render(challengesContainer);

//function keyword filter

function keyFilter() {
  // Declare variables
  var input, filter, challenges, title, infoText, i;
  input = document.getElementById('textFilter');
  if (!input) {
    console.error('Input element not found.!');
    return;
  }
  filter = input.value.toUpperCase();
  challenges = document.querySelectorAll('.challenges-container__challenge');

  // loop through challenges
  for (i = 0; i < challenges.length; i++) {
    title = challenges[i].querySelector(
      '.challenges-container__challenge__title'
    );

    infoText = challenges[i].querySelector(
      '.challenges-container__challenge__text'
    );

    if (title && infoText) {
      const titleText = title.textContent || title.innerHTML;
      const textContent = infoText.textContent || infoText.innerText;

      if (
        titleText.toUpperCase().indexOf(filter) > -1 ||
        textContent.toUpperCase().indexOf(filter) > -1
      ) {
        challenges[i].style.display = '';
      } else {
        challenges[i].style.display = 'none';
      }
    }
  }
}

document.getElementById('textFilter').addEventListener('input', keyFilter);
