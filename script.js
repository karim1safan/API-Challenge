function getPosts(userId) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://jsonplaceholder.typicode.com/posts?userId=" + userId
  );

  xhr.send();

  // console.log(xhr);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(xhr.responseText);

      const data = JSON.parse(xhr.responseText);

      // console.log(data);

      // Clear previous posts before adding new ones
      document.getElementById("posts").innerHTML = "";

      data.forEach((post) => {
        document.getElementById("posts").innerHTML += `
          <div class="post">
            <h3>${post.title}</h3>
            <p>
              ${post.body}
            </p>
          </div>
        `;
      });
    } else {
      alert("ERROR!");
    }
  };
}

function getUsers() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users?user");

  xhr.send();

  // console.log(xhr);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(xhr.responseText);

      const data = JSON.parse(xhr.responseText);

      // console.log(data);

      data.forEach((user) => {
        document.getElementById("users").innerHTML += `
          <div class="user" onClick="userClicked(${user.id}, this)">
            <h3>${user.name}</h3>
            <p>
              ${user.email}
            </p>
          </div>
        `;
      });
    } else {
      alert("ERROR!");
    }
  };
}

getPosts(1);
getUsers();

function userClicked(id, currentElement) {
  getPosts(id);

  // Remove "selected" class from all user elements
  document.querySelectorAll(".user.selected").forEach((el) => {
    el.classList.remove("selected");
  });

  currentElement.classList.add("selected");
}