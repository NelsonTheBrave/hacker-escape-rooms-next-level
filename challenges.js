class Challenge {
  constructor(data) {
    this.data = data;
  }

  render() {
    const challengeCard = document.createElement('div');
    challengeCard.id = this.data.id;
    challengeCard.classList.add('challenges-container__challenge');

    const img = document.createElement('img');
    img.classList.add('challenges-container__challenge__img');
    img.src = this.data.image + '?image=' + Math.floor(Math.random() * 16);
    challengeCard.append(img);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('challenges-container__challenge__lowerWrapper');
    challengeCard.append(titleDiv);

    const title = document.createElement('h3');
    title.classList.add('.challenges-container__challenge__title');
    title.textContent = this.data.title;
    titleDiv.append(title);

    const type = document.createElement('h3');
    type.classList.add('challenges-container__challenge__type');
    type.textContent = '(' + this.data.type + ')';
    titleDiv.append(type);

    const ratingContainer = document.createElement('small');
    ratingContainer.classList.add('challenges-container__challenge__rating');
    challengeCard.append(ratingContainer);

    const rating = document.createElement('span');
    rating.classList.add('challenges-container__challenge__rating__stars');
    rating.ariaLabel = 'Rating';
    rating.role = 'meter';
    rating.ariaValueMin = '0';
    rating.ariaValueMax = '5';
    rating.ariaValueNow = this.data.rating;
    ratingContainer.append(rating);

    const star1 = document.createElement('i');
    star1.ariaHidden = true;
    rating.append(star1);

    const star2 = document.createElement('i');
    star2.ariaHidden = true;
    rating.append(star2);

    const star3 = document.createElement('i');
    star3.ariaHidden = true;
    rating.append(star3);

    const star4 = document.createElement('i');
    star4.ariaHidden = true;
    rating.append(star4);

    const star5 = document.createElement('i');
    star5.ariaHidden = true;
    rating.append(star5);

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
    challengeCard.append(challengeText);

    const challengeButton = document.createElement('button');
    challengeButton.classList.add('challenges-container__challenge__button');
    challengeButton.textContent =
      this.data.type === 'online' ? 'Take challenge online' : 'Book this room';
    challengeCard.append(challengeButton);

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
