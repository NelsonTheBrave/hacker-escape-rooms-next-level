import { BookingManager } from './booking-manager.js';
import { FilterUI } from './filterUI.js';

class Challenge {
  constructor(data) {
    this.data = data;
  }

  render() {
    let challenges = this.data;
    const challengeCard = document.createElement('div');
    challengeCard.id = this.data.id;
    challengeCard.classList.add('challenges-container__challenge');
    challengeCard.classList.add(this.data.type);
    if (this.data.type === 'online') {
      challengeCard.innerHTML = '<i class="fa-solid fa-globe"></i>';
    } else {
      challengeCard.innerHTML = '<i class="fa-solid fa-building-user"></i>';
    }

    for (let i = 0; i < this.data.labels.length; i++) {
      challengeCard.classList.add(this.data.labels[i]);
    }

    const img = document.createElement('img');
    img.classList.add('challenges-container__challenge__img');
    img.src = this.data.image;
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
    const maxLength = 50;
    challengeText.classList.add('challenges-container__challenge__text');
    challengeText.textContent = this.data.description;
    if (challengeText.textContent.length > maxLength) {
      challengeText.textContent =
        this.data.description.slice(0, maxLength) + '...';
    }
    wrapperDiv.append(challengeText);

    const challengeButton = document.createElement('button');
    challengeButton.classList.add('challenges-container__challenge__button');
    challengeButton.textContent =
      this.data.type === 'online' ? 'Take challenge online' : 'Book this room';
    wrapperDiv.append(challengeButton);
    challengeButton.addEventListener('click', () => {
      new BookingManager().createBookingPage(challenges);
    });
    return challengeCard;
  }
}
class Loadingscreen {
  static show() {
    this.loadingAnimation = document.createElement('div');
    this.loadingAnimation.classList.add('showLoading');
    document.body.appendChild(this.loadingAnimation);

    this.loadingText = document.createElement('h1');
    this.loadingText.innerText = 'Jacking in..';
    this.loadingAnimation.appendChild(this.loadingText);
  }
  static hide(delayMilliseconds) {
    setTimeout(() => {
      this.loadingAnimation.remove();
    }, delayMilliseconds);
  }
}

class APIAdapter {
  async getChallenges() {
    try {
      const res = await fetch(
        'https://lernia-sjj-assignments.vercel.app/api/challenges'
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch challenges. status: ${res.status}`);
      } else {
        Loadingscreen.show();
      }
      const payload = await res.json();
      Loadingscreen.hide(500);

      return payload.challenges.map(
        (challengeData) => new Challenge(challengeData)
      );
    } catch (error) {
      console.error('Error fetching challenges:', error.message);
      const errorContainer = document.getElementById('challenges');
      errorContainer.style.display = 'flex';
      errorContainer.style.justifyContent = 'center';
      errorContainer.style.alignItems = 'center';

      const errorMessage = document.createElement('h1');
      errorMessage.style.fontSize = '25px';
      errorMessage.style.display = 'flex';
      errorMessage.style.alignSelf = 'center';
      errorMessage.textContent =
        'Challenges could not be loaded, this is not good.';
      errorContainer.appendChild(errorMessage);
    }
  }
}

export class ChallengeListView {
  async render(container) {
    const api = new APIAdapter();
    const challenges = await api.getChallenges();

    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();

      container.append(element);
    }
    new FilterUI().render(container);
  }
}

export class TopThreeView {
  async render(container) {
    const challenges = await new APIAdapter().getChallenges();
    const challengesSortedByRating = challenges.sort(
      (a, b) => b.data.rating - a.data.rating
    );
    for (let i = 0; i < 3; i++) {
      const challenge = challengesSortedByRating[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}
