var generateBtn = $("#generate");
var randomDogPicEl = $("#randomDogPic");
var breedDivEl = $("#breedDiv");
//var breedEl = $("#breed");
var dogBtn = $("#dog-APIninja");
var dogAttrEl = $("#dog-attributes");
var startEl = $("#start");

var globalBreed = "";
var myDogAttributes = [];

//Function to display random image from Dog API
function randomDogImage(dogAPIfetch) {
  //appends randomly generated dog image to element hook randomDogPicEl
  randomDogPicEl.text("");//clear element hook
  var imgEl = $("<img>");
  imgEl.attr("value", "dog-image").attr("src", dogAPIfetch.message);
  randomDogPicEl.append(imgEl);

  //extracts the breed string in the return message
  var split = dogAPIfetch.message.split("/");
  var breed = split[4];
  console.log(breed.replace("-", " "));//debug
  breed = breed.replace("-", " ");
  breed = breed.charAt(0).toUpperCase() + breed.slice(1);

  //append breed text to element hook breedDivEl
  breedDivEl.text("");
  var h2El = $("<h2>");
  h2El.text("Breed: " + breed);
  breedDivEl.append(h2El);

  //temporary
  globalBreed = breed;
}

function addDogAttributes(myDog) {
    var barking = myDog[0].barking;
    console.log(barking);

    var divEl = $("<div>");
    divEl.addClass("box");
    dogAttrEl.append(divEl);
    var pEl = $("<p>");
    pEl.addClass("has-text-weight-bold");
    pEl.text("Barking");
    dogAttrEl.append(pEl);
    var progressEl = $("<progress>");
    progressEl.addClass("progress is-large");
    if(barking==1 || barking==2) {
        progressEl.addClass("is-danger");
    } else if (barking == 3) {
        progressEl.addClass("is-warning");
    } else if (barking == 4 || barking == 5) {
        progressEl.addClass("is-success");
    }
    progressEl.attr("value", barking);
    progressEl.attr("max", 5);
    dogAttrEl.append(progressEl);
}
//Function to handle the Generate Rnadom Dog event which runs a fetch on the Dog API.
//This function output will call the randomDogImage function
function generateButtonHandler() {
  var url = "https://dog.ceo/api/breeds/image/random";

  fetch(url)//calls Fetch API and uses requestURL as parameter, returns a promise
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      //fetch data now available (add functions)
        console.log(data);//debug to show fetch return
        randomDogImage(data);
      })
    } else {
      alert("Error. Failed to fetch response.");
    }
  })
}
function adoptadogButtonHandler() {
  var url = "https://api.api-ninjas.com/v1/dogs?name=" + globalBreed;

  fetch(url, {headers: {"X-Api-Key": "CKcLibAK2M5dIXTKItimPA==3Hq30cdoiqtDbaO0"}})//calls Fetch API and uses requestURL as parameter, returns a promise
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      //fetch data now available (add functions)
        console.log(data);//debug to show fetch return
        addDogAttributes(data);
      })
    } else {
      alert("Error. Failed to fetch response.");
    }
  })
};
//Event handlers
generateBtn.on("click", generateButtonHandler);
dogBtn.on("click", adoptadogButtonHandler);

//Event listener for checkboxes
$('.modal-card-body').on('click','.checkbox', function(event){
  var checkboxValues = 12; 

  for (var i = 0; i < checkboxValues; i++) {
    if($(event.target).attr('index') == i) {
      if($(event.target).is(":checked")) {
        $(event.target).attr("value" + i, "true");
      } else {
        $(event.target).attr("value" + i, "false");
      }
    }
  }
});

$(".modal-card-foot").on("click", ".button", function(event) {
  if($(event.target).attr('id') == "searchBtn") {
    startEl.hide();
    generateButtonHandler();
  }
})