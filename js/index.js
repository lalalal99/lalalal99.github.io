user = "lalalal99";
root = "https://" + user + ".github.io/";
rootGit = "https://github.com/" + user + "/";

// iframe = document.getElementsByTagName("iframe")[0];

repos = [];

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
    // [repo] => [(repo, true)]
    // console.log(repos);
    repos.sort(compareFn);
    console.log(repos);

    projects = document.getElementsByClassName("projects-container")[0];

    repos.forEach((repo) => {
      projects.appendChild(createProjectCard(repo, null));
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

// getRepos();
function compareFn(a, b) {
  // sorts by true/false, true first
  aExists = a[1]; // UrlExists(root + "/" + a);
  bExists = b[1]; // UrlExists(root + "/" + b);
  if (aExists && !bExists) return -1;
  if (bExists && !aExists) return 1;
  if ((aExists && bExists) || (!aExists && !bExists)) return 0;
}

function createProjectCard(title_exists, descr) {
  let [title, exists] = title_exists;
  const a = document.createElement("a");
  const node = document.createTextNode(title);
  a.classList.add("projects-container-item");
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  if (exists) {
    a.href = root + title;
  } else {
    a.href = rootGit + title;
  }

  a.appendChild(node);
  return a;
}
