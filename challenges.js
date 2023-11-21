class Challenge {
  constructor(data) {
    this.data = data;
  }

  render() {
    const challengeCard = document.createElement('div');
    challengeCard.classList.add('challenges-container__challenge');

    const img = document.createElement('img');
    img.classList.add('challenges-container__challenge__img');
    img.src = this.data.image;
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

    const rating = document.createElement('small'); // Need to add the ratings
    rating.classList.add('.challenges-container__challenge__rating');
    challengeCard.append(rating);

    const participants = document.createElement('span');
    participants.classList.add(
      'challenges-container__challenge__rating__participants'
    );
    participants.textContent =
      this.data.minParticipants === this.data.maxParticipants
        ? `${this.data.minParticipants} participants`
        : `${this.data.minParticipants}-${this.data.maxParticipants} participants`;
    rating.append(participants);

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
  async getApi() {
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
    const challenges = await api.getApi();

    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();

      container.append(element);
    }
  }
}

// Starting point
const challengesContainer = document.querySelector('#challenges');

let view = new ChallengeListView();
view.render(challengesContainer);
