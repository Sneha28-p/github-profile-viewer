function getUser() {
  let input = document.getElementById("username").value.trim();

  if (!input) {
    document.getElementById("profile").innerHTML = "<p>Please enter a username or link ⚠️</p>";
    return;
  }

  let username;
  if (input.includes("github.com/")) {
    username = input.split("github.com/").pop().replace(/\/+$/, "");
  } else {
    username = input;
  }

  const url = `https://api.github.com/users/${username}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const user = JSON.parse(xhr.responseText);
      displayUser(user);
    } else {
      document.getElementById("profile").innerHTML = "<p>User not found ❌</p>";
    }
  };

  xhr.onerror = function () {
    document.getElementById("profile").innerHTML = "<p>Network error ❌</p>";
  };

  xhr.send();
}

function displayUser(user) {
  document.getElementById("profile").innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" width="120" style="border-radius:50%">
      <h2>${user.name || "No Name Available"}</h2>
      <p>@${user.login}</p>
      <p>${user.bio || "No bio available"}</p>
      <p>Followers: ${user.followers} | Following: ${user.following}</p>
      <p>Repos: ${user.public_repos}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;
}
