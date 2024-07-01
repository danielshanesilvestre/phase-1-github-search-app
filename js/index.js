function constructOnClickHandler(login) {
  return () => {
    const configuration = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
      },
    };

    fetch(`https://api.github.com/users/${login}/repos`, configuration)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          let repos_list = document.getElementById("repos-list");
          repos_list.replaceChildren();

          for (let repo of data) {
            let {
              full_name,
              html_url
            } = repo;

            let li = document.createElement("li");
            li.textContent = full_name;
            let a = document.createElement("a");
            a.textContent = html_url;
            a.setAttribute("href", html_url);
            li.append(a);

            repos_list.append(li);
          }
        });
  }
}

function onSubmit(event) {
  event.preventDefault();

  let search_query = document.getElementById("search");

  const configuration = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json",
    },
  };

  fetch(`https://api.github.com/users?q=${search_query.value}`, configuration)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        let user_list = document.getElementById("user-list");
        user_list.replaceChildren();

        for (let user of data) {
          let {
            login,
            avatar_url,
            html_url,
          } = user;

          let li = document.createElement("li");
          li.textContent = login;
          li.addEventListener("click", constructOnClickHandler(login));
          let img = document.createElement("img");
          img.setAttribute("src", avatar_url)
          li.append(img);
          let a = document.createElement("a");
          a.textContent = html_url;
          a.setAttribute("href", html_url);
          li.append(a);

          user_list.append(li);
        }
      });
}

function onLoad() {
  let search_form = document.getElementById("github-form");

  search_form.addEventListener("submit", onSubmit);
}

document.addEventListener("DOMContentLoaded", onLoad);