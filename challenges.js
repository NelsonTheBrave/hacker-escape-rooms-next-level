// Fetch resources from API
class APIAdapter {
  async getApi() {
    const res = await fetch(
      'https://lernia-sjj-assignments.vercel.app/api/challenges'
    );
    const data = await res.json();

    return data.challenges.map((challengeData) => new Challenge(challengeData));
  }
}
