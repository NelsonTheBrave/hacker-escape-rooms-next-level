// Fetch resources from API
async function createChallenges() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  const data = await res.json();
}
