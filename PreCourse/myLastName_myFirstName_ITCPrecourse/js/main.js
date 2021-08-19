//replace with your user:
const GITHUB_URL = "https://api.github.com/users/IsraelTechChallengeITC";

fetch(GITHUB_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    const profileImage = document.getElementById("profile-image");
    profileImage.src = data.avatar_url;
  });