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
  url = "https://api.github.com/users/" + user + "/repos";
  httpGetAsync(url, (repos) => {
    repos = repos.map((x) => (x.name, UrlExists(root + "/" + x.name)));
    console.log(repos);
    // iframe = document.getElementById("preview");
    // let repo = repos[5];
    repos.forEach((repo) => {
      newUrl = root + "/" + repo;
      console.log(newUrl + " " + UrlExists(newUrl));
      // // iframe.src = newUrl;
      // iframe.src = "https://lalalal99.github.io/maze-generator";
    });
    repos.sort(compareFn);
    console.log("-------------------------------------");
    repos.forEach((repo) => {
      newUrl = root + "/" + repo;
      console.log(newUrl + " " + UrlExists(newUrl));
    });
  });
}

function UrlExists(url) {
  // var http = new XMLHttpRequest();
  // http.open("HEAD", url, false);
  // http.send();
  // return http.status != 404;

  var request;
  if (window.XMLHttpRequest) 
    request = new XMLHttpRequest();
  else 
    request = new ActiveXObject("Microsoft.XMLHTTP");
  request.open("GET", url, false);
  request.send(); // there will be a 'pause' here until the response to come.
  // the object request will be actually modified
  return request.status != 404;

  //   fetch(url).then((response) => console.log(url, response.status != 404));
}

// getRepos();
function compareFn(a, b) {
  aExists = UrlExists(a);
  bExists = UrlExists(b);
  if (aExists && !bExists) return 1;
  if (bExists && !aExists) return -1;
  if ((aExists && bExists) || (!aExists && !bExists)) return 0;
}
