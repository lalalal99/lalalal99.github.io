user = "lalalal99";
root = "https://" + user + ".github.io/";
rootGit = "https://github.com/" + user + "/";
const millis = 40;

repos = [];

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

function init() {
  getRepos();
}

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText));
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function getRepos() {
  url = "https://api.github.com/users/" + user + "/repos";
  httpGetAsync(url, (repos) => {
    repos = repos.map((x) => [x.name, UrlExists(root + x.name)]);
    // [repo] => [(repo, true/false)]
    repos.sort(compareFn);
    console.log(repos);

    projects = document.getElementsByClassName("projects-container")[0];

    delay = 0;
    repos.forEach((repo) => {
      projects.appendChild(createProjectCard(repo, null, delay++));
    });

    // iframe = document.getElementById("preview");
    // // let repo = repos[5];
    // repos.forEach((repo) => {
    //   newUrl = root + "/" + repo;
    //   console.log(newUrl + " " + UrlExists(newUrl));
    //   // // iframe.src = newUrl;
    // iframe.src = "https://lalalal99.github.io/maze-generator";
    // });
    // repos.forEach((repo) => {
    //   newUrl = root + "/" + repo;
    //   console.log(newUrl + " " + UrlExists(newUrl));
    // });
  });
}

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;
}

function compareFn(a, b) {
  // sorts by true/false, true first
  aExists = a[1];
  bExists = b[1];
  if (aExists && !bExists) return -1;
  if (bExists && !aExists) return 1;
  if ((aExists && bExists) || (!aExists && !bExists)) return 0;
}

function createProjectCard(title_exists, descr, delay) {
  let [title, exists] = title_exists;
  const a = document.createElement("a");
  a.classList.add("projects-container-item");
  a.classList.add("opacity");
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  if (exists) {
    a.href = root + title;
    a.classList.add("color-hover");
  } else {
    a.href = rootGit + title;
  }

  title = title.replaceAll("-", " ");
  const node = document.createTextNode(title);
  a.appendChild(node);
  setTimeout(() => {
    a.classList.remove("opacity");
  }, delay * millis);
  return a;
}
