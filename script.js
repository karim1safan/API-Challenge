function getPosts(userId) {
  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
    .then((response) => {
      if (!response.ok) throw new Error("ERROR!");
      return response.json();
    })
    .then((data) => {
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
    });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("ERROR!");
        return response.json();
      })
      .then((users) => {
        document.getElementById("users").innerHTML = "";
        users.forEach((user) => {
          document.getElementById("users").innerHTML += `
          <div class="user" onClick="userClicked(${user.id}, this)">
            <h3>${user.name}</h3>
            <p>
              ${user.email}
            </p>
          </div>
        `;
        });
      });
    resolve();
  });
}

getUsers().then(() => {
  getPosts(1);
});

function userClicked(id, currentElement) {
  getPosts(id);

  // Remove "selected" class from all user elements
  document.querySelectorAll(".user.selected").forEach((el) => {
    el.classList.remove("selected");
  });

  currentElement.classList.add("selected");
}
