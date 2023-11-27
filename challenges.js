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
    title.classList.add('.challenges-container__challenge__title');
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
    rating.ariaValueNow = Math.ceil(this.data.rating);
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

// Starting point render challenges för challenge page
const challengesContainer = document.querySelector('.challenges-container');

let view = new ChallengeListView();
view.render(challengesContainer);

// Filter by tags

class Filter {
  constructor(tagSelector) {
    this.tagSelector = document.querySelectorAll(tagSelector); // What tag to filter
    this.activeTags = []; //Array to store active tags
  }

  /*  Filter method to display the selected tags and hide the other tags.
      This will also reset the filter and display all challenges when none is selected */
  filterTags() {
    const cards = document.querySelectorAll('.challenges-container__challenge');

    if (this.activeTags.length === 0) {
      cards.forEach((card) => {
        card.style.display = '';
      });
    } else {
      cards.forEach((card) => {
        if (this.activeTags.some((tag) => card.classList.contains(tag))) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  // Method to Toggle the chosen tag as active
  toggleTag(tag) {
    const index = this.activeTags.indexOf(tag);
    if (index === -1) {
      this.activeTags.push(tag);
    } else {
      this.activeTags.splice(index, 1);
    }
  }
}

// class for eventlistener and handlers for the tag buttons
class FilterButton {
  constructor(buttonId, filterInstance, tag) {
    this.button = document.getElementById(buttonId);
    this.filterInstance = filterInstance;
    this.tag = tag;

    this.button.addEventListener('click', this.handleButtonClick.bind(this));
  }

  handleButtonClick() {
    this.filterInstance.toggleTag(this.tag);
    this.filterInstance.filterTags();

    //Add class -active to the active tag button
    if (this.filterInstance.activeTags.includes(this.tag)) {
      this.button.classList.add('-active');
    } else {
      this.button.classList.remove('-active');
    }
  }
}

// Filter by tag starting point
let viewTag = new Filter();

// Buttons to filter by tag
const linuxButton = new FilterButton('linuxTag', viewTag, 'linux');
const webButton = new FilterButton('webTag', viewTag, 'web');
const javascriptButton = new FilterButton(
  'javascriptTag',
  viewTag,
  'javascript'
);
const phreakingButton = new FilterButton('phreakingTag', viewTag, 'phreaking');
const bashButton = new FilterButton('bashTag', viewTag, 'bash');
const sshButton = new FilterButton('sshTag', viewTag, 'ssh');
const codingButton = new FilterButton('codingTag', viewTag, 'coding');
const hackingButton = new FilterButton('hackingTag', viewTag, 'hacking');
const ctfButton = new FilterButton('ctfTag', viewTag, 'ctf');
const electronicsButton = new FilterButton(
  'electronicsTag',
  viewTag,
  'electronics'
);
