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
    repos = repos.map((x) => ({
      name: x.name,
      descr: x.descr,
      exists: UrlExists(root + x.name),
    }));
    // [repo] => [(repo, true/false)]
    repos.sort(compareFn);

    projects = document.getElementsByClassName("projects-container")[0];

    delay = 0;
    repos.forEach((repo) => {
      projects.appendChild(createProjectCard(repo, delay++));
    });
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
  aExists = a.exists;
  bExists = b.exists;
  if (aExists && !bExists) return -1;
  if (bExists && !aExists) return 1;
  if ((aExists && bExists) || (!aExists && !bExists)) return 0;
}

function createProjectCard(repo, delay) {
  let [title, descr, exists] = [repo.name, repo.descr, repo.exists];
  const a = document.createElement("a");
  a.classList.add("projects-container-item");
  a.classList.add("opacity");
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  if (exists) {
    a.href = root + title;
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
