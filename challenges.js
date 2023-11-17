// Fetch resources from API and render challenges in cards
async function createChallenges() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  const data = await res.json();

  const challenges = data.challenges;

  let challengesRender = challenges;

  const challengesCard = document.querySelector(
    ".challenges-container__challenge"
  );

  challengesRender.forEach((challenge) => {
    //  Create elements to put data into
    //  add classes to elements
    //  do this for every challenge in challengeRender.
    //
  });
}
