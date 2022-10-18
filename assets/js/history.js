var savedDogEl = $("#savedDog");
var burgerEl = $("#burger");
var navbarEl = $("#navbarMenuHeroA");

var dogNames = [];
//Function to initialize the page which gets data from local storage and dynamically updates the HTML
function init() {
  dogNames = JSON.parse(localStorage.getItem("savedDogs"));
  if(dogNames==null) {
    dogNames = [];
  }
  savedDogEl.text("");

  for(var i=0; i<dogNames.length; i++) {
    var pEl = $("<p>");
    pEl.addClass("title");
    pEl.text("Dog Breed: " + dogNames[i]);
    savedDogEl.append(pEl);
    var breakEl = $("<br>");
    pEl.append(breakEl);
    /*
    var divEl = $("<div>");
    divEl.addClass("tile is-vertical is-10");
    savedDogEl.append(divEl);
    var divEl2 = $("<div>");
    divEl.addClass("tile");
    divEl.append(divEl2);
    var divEl3 = $("<div>");
    divEl.addClass("tile is-parent");
    divEl2.append(divEl3);
    var articleEl = $("<article>");
    divEl.addClass("tile is-child notification is-info");
    divEl3.append(articleEl);
    var pEl = $("<p>");
    pEl.addClass("title");
    pEl.text("Dog Breed: " + dogNames[i]);
    divEl3.append(pEl);
    */
  }
} init();

//Event listener for burger icon
burgerEl.on("click", function() {
  for(var i=0; i<navbarEl[0].classList.length; i++) {
    if(navbarEl[0].classList[i]=="is-active") {
      var active = true;
      navbarEl.removeClass("is-active");
    }
  }
  if(active==true) {
    navbarEl.removeClass("is-active");
  } else {
    navbarEl.addClass("is-active");
  }
});