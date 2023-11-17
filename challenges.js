async function getApi() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  const data = await res.json();
  challenges = data.challenges;
  renderChallenges(challenges);
}

getApi();
// Render challenges in cards
function renderChallenges(challenges) {
  let challengesRender = challenges;
  const challengesContainer = document.querySelector(".challenges-container");

  challengesRender.forEach((challenges) => {
    // Create challenge card
    const challengeCard = document.createElement("div");
    const titleDiv = document.createElement("div");
    const title = document.createElement("h3");
    const img = document.createElement("img");
    const rating = document.createElement("small");
    const participants = document.createElement("span");
    const challengeText = document.createElement("p");
    const challengeButton = document.createElement("button");

    // Add classes to challenge card elements
    challengeCard.classList.add("challenges-container__challenge");
    titleDiv.classList.add("challenges-container__challenge__lowerWrapper");
    title.classList.add(".challenges-container__challenge__title");
    img.classList.add("challenges-container__challenge__img");
    rating.classList.add(".challenges-container__challenge__rating");
    participants.classList.add(
      "challenges-container__challenge__rating__participants"
    );
    challengeText.classList.add("challenges-container__challenge__text");
    challengeButton.classList.add("challenges-container__challenge__button");

    // Add content to challenge card elements
    challengeCard.id = challenges.id;
    title.textContent = challenges.title;
    img.src = challenges.image;
    participants.textContent =
      challenges.minParticipants === challenges.maxParticipants
        ? `${challenges.minParticipants} participants`
        : `${challenges.minParticipants}-${challenges.maxParticipants} participants`;
    challengeText.textContent = challenges.description;
    challengeButton.textContent = "Book this room";

    // Append challenge elements
    challengesContainer.appendChild(challengeCard);
    challengeCard.appendChild(img);
    challengeCard.appendChild(titleDiv);
    titleDiv.appendChild(title);
    challengeCard.appendChild(rating);
    rating.appendChild(participants);
    challengeCard.appendChild(challengeText);
    challengeCard.appendChild(challengeButton);
  });
}
