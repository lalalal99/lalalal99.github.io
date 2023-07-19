user = "lalalal99";
root = "https://" + user + ".github.io";

// iframe = document.getElementsByTagName("iframe")[0];

repos = [];

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText));
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function func(list) {}

function getRepos() {
  iframe = document.getElementById("preview");
  url = "https://api.github.com/users/" + user + "/repos";
  httpGetAsync(url, (repos) => {
    let repo = repos[5];
    // repos.forEach((repo) => {
    newUrl = root + "/" + repo.name;
    console.log(newUrl + " " + UrlExists(newUrl));
    // iframe.src = newUrl;
    iframe.src = "https://lalalal99.github.io/maze-generator";
    // });
  });
}

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;

  //   fetch(url).then((response) => console.log(url, response.status != 404));
}

// getRepos();
