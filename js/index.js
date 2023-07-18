user = "lalalal99";
root = "https://" + user + ".github.io";

repos = [];

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText));
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function func(list) {
  list.forEach((repo) => {
    newUrl = root + "/" + repo.name;
    console.log(newUrl + " " + UrlExists(newUrl));
  });
}

function getRepos() {
  url = "https://api.github.com/users/" + user + "/repos";
  httpGetAsync(url, func);
}

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;
}

getRepos();
