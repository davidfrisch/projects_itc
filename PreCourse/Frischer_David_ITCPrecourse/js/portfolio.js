//replace with your user:
const GITHUB_URL = "https://api.github.com/users/davidfrisch";

//Fetch information from a GitHub account
fetch(GITHUB_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    const profileImage = document.getElementById("profile-image");
    const idName = document.getElementById("myName");
    idName.textContent = data.name;
    profileImage.src = data.avatar_url;
  });