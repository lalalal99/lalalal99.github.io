window.onscroll = function () {
  let invisible_class = "invisible";
  let up_icon = document.getElementsByClassName("up-icon")[0];
  if (window.pageYOffset == "0") up_icon.classList.add(invisible_class);
  else up_icon.classList.remove(invisible_class);
};
