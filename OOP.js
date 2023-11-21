//API adapter
class APIAdapter {
  async getChallenges() {
    const res = await fetch(
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    );
    const payload = await res.json(); //Gets object with array of 30 challenges
    return payload.challenges.map((index) => new createChallenge(index));
  }
}

// Filters --------------------------------------------------------------

// Create challenges
class createChallenge {
  constructor(data) {
    this.data = data;
  }
  render() {
    console.log("I will soon render a card I hope");
    return createCardDOMElements(this.data);
  }
}

// Views ------------------------------------------------------------------

class listView {
  async render(container) {
    const challenges = await new APIAdapter().getChallenges();
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}

class topThreeView {
  async render(container) {
    const challenges = await new APIAdapter().getChallenges();
    const sortedByRating = challenges.sort(
      (a, b) => b.data.rating - a.data.rating
    );
    for (let i = 0; i < 3; i++) {
      const challenge = challenges[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}

// Bokning

// CODE ENTRY POINT ---------------------------------------------------------
const challengesDiv = document.querySelector("#challenges");
const topThreeDiv = document.querySelector("#topThree");
// new listView().render(challengesDiv);
new topThreeView().render(topThreeDiv);

// Function used by Challenge.render()
function createCardDOMElements(data) {
  console.log(data);
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
