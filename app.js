async function getUser() {
  const input = document.getElementById("username").value.trim();

  if (!input) {
    showMessage("Please enter a username or link ⚠️")
    return;
  }

  let username;
  if (input.includes("github.com/")) {
    username = input.split("github.com/").pop().replace(/\/+$/, "");
  } else {
    username = input;
  }

  const url = `https://api.github.com/users/${username}`;
  showMessage("⏳ Loading...");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      showMessage("User not found ❌");
      return;
    }

    const user = await response.json();
    displayUser(user);
  } catch (error) {
    showMessage("Network error ❌");
    console.error("Error fetching user:", error);
  }
}

function displayUser(user) {
  document.getElementById("profile").innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" class="avatar">
      <h2>${user.name || "No Name Available"}</h2>
      <p>@${user.login}</p>
      <p>${user.bio || "No bio available"}</p>
      <p>Followers: ${user.followers} | Following: ${user.following}</p>
      <p>Repos: ${user.public_repos}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;
}
function showMessage(msg) {
  document.querySelector("#profile").innerHTML = `<p>${msg}</p>`;
}