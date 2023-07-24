user = "lalalal99";
root = "https://" + user + ".github.io/";
rootGit = "https://github.com/" + user + "/";
const millis = 40;

repos = [];

function init() {
  getRepos();
}

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText));
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

function getRepos() {
  url = "https://api.github.com/users/" + user + "/repos";
  httpGetAsync(url, (repos) => {
    repos = repos
      .map((x) => ({
        name: x.name,
        descr: x.descr,
        exists: UrlExists(root + x.name),
      }))
      .filter((y) => y.name !== "lalalal99.github.io")
      .sort(compareFn);

    document.getElementsByClassName("projects-container")[0].classList.remove("invisible");
    projects_viewable = document.getElementsByClassName("projects-viewable")[0];
    projects_code = document.getElementsByClassName("projects-code")[0];

    projects_viewable.innerHTML = ""
    projects_code.innerHTML = ""

    delay = 2;
    repos.forEach((repo) => {
      if (repo.exists) projects_viewable.appendChild(createProjectCard(repo, delay, true));
      projects_code.appendChild(createProjectCard(repo, delay, false));
      delay++;
    });
  });
}

function UrlExists(url) {
  // check if the page exists, returns true/false
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

function createProjectCard(repo, delay, viewable) {
  //returns an a element
  // <a class="projects-container-item" href="http://www.google.com" target="_blank" rel="noopener noreferrer">Lorem, ipsum dolor.</a>
  
  let [title, descr, exists] = [repo.name, repo.descr, repo.exists];
  const a = document.createElement("a");
  a.classList.add("invisible");
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  if (exists && viewable) {
    a.href = root + title;
  } else {
    a.href = rootGit + title;
  }
  a.classList.add("projects-container-item");

  title = title.replaceAll("-", " ");
  const node = document.createTextNode(title);
  a.appendChild(node);
  setTimeout(() => {
    a.classList.remove("invisible");
  }, delay * millis);
  return a;
}
