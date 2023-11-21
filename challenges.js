class Challenge {
  constructor(data) {
    this.data = data;
  }
  render() {
    return createCardDOMElements(this.data);
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

class TopThreeView {
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

// Function used by Challenge.render() ----------------------------------------------------------------------------------
function createCardDOMElements(data) {
  newCard = document.createElement("div");
  newCard.classList = "challenges-container__challenge";
  newCard.innerHTML = `
<img
  class="challenges-container__challenge__img"
  src="${data.image}"
  alt="Image that illustrates the challenge"
/>
<div class="challenges-container__challenge__lowerWrapper">
<h3 class="challenges-container__challenge__title">
${data.title}
</h3>
<small class="challenges-container__challenge__rating">
  <span class="challenges-container__challenge__rating__stars" aria-label="Rating" role="meter" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${Math.ceil(
    data.rating
  )}">
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
  </span>
  <span
    class="challenges-container__challenge__rating__participants"
  >${data.minParticipants}-${data.maxParticipants} participants</span>
</small>
<p class="challenges-container__challenge__text">
${data.description}
</p>
<button class="challenges-container__challenge__button" "${data.type}">
${data.type === "online" ? "Book online" : "Go to room"}</button>
</div>`;
  return newCard;
}
// Starting point ------------------------------------------------------------------------------------------------------------

// Render all cards at Challenges page
/* const challengesContainer = document.querySelector('#challenges');

let view = new ChallengeListView();
view.render(challengesContainer); */

// Render top three cards at Main page Challenges-section
const topThreeContainer = document.querySelector('.challenges-container.main-page');
new TopThreeView().render(topThreeContainer);
