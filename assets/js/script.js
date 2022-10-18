//jQuery selectors
var randomDogPicEl = $("#randomDogPic");
var breedDivEl = $("#breedDiv");
var dogAttrEl = $("#dog-attributes");
var startEl = $("#start");
var nextBtnEl = $("#nextBtn");
var saveBtnEl = $("#saveBtn");
var buttonsEl = $("#buttons");
var searchEl = $("#search");

//Global Variables
var globalBreed = "";
var checkboxValues = 12; 
var myDogAttributes = [];
var dogNames = [];
var swap = false;

//Function to initialize the browser
function init() {
  dogNames = JSON.parse(localStorage.getItem("savedDogs"));
  if(dogNames==null) {
    dogNames = [];
  }

  buttonsEl.hide();
  searchEl.hide();
  //reset user input for dog attributes
  for(var i=0; i<checkboxValues; i++) {
    myDogAttributes[i]=false;
  }
} init();
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

  //update global variable with latest search
  globalBreed = breed;
}
//Function to render dog attributes based on data from APIninjas
function addDogAttributes(myDog) {
  //creates an array to assign an index to certain variables within the data object returned from the API
  var attributeList = [myDog[0].barking, myDog[0].coat_length, 
  myDog[0].drooling, myDog[0].energy, 
  myDog[0].good_with_children, myDog[0].good_with_other_dogs, 
  myDog[0].good_with_strangers, myDog[0].grooming, 
  myDog[0].playfulness, myDog[0].protectiveness, 
  myDog[0].shedding, myDog[0].trainability];

  //reset element hook for dog attributes
  dogAttrEl.text("");
  var divEl = $("<div>");
  divEl.addClass("box");
  dogAttrEl.append(divEl);
  
  //render dog attributes based on user input from checkboxes
  for (var i = 0; i < checkboxValues; i++) {
    if(myDogAttributes[i]) {
      var divEl2 = $("<div>");
      divEl.append(divEl2);
      var pEl = $("<p>");
      pEl.addClass("has-text-weight-bold");
      var name = $("#" + i).html();
      pEl.text(name);
      divEl2.append(pEl);
      var progressEl = $("<progress>");
      progressEl.addClass("progress is-large");
      if(attributeList[i]==1 || attributeList[i]==2) {
        progressEl.addClass("is-danger");
      } else if (attributeList[i] == 3) {
        progressEl.addClass("is-warning");
      } else if (attributeList[i] == 4 || attributeList[i] == 5) {
        progressEl.addClass("is-success");
      }
      progressEl.attr("value", attributeList[i]);
      progressEl.attr("max", 5);
      divEl2.append(progressEl);
    }
  }
}
//Function to fetch DogAPI, the output will call the randomDogImage and searchAPIninjas functions
function searchDogAPI() {
  var url = "https://dog.ceo/api/breeds/image/random";

  fetch(url)//calls Fetch API and uses requestURL as parameter, returns a promise
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      //fetch data now available (add functions)
        console.log(data);//debug to show fetch return
        randomDogImage(data);
        searchAPIninjas();
      })
    } else {
      alert("Error. Failed to fetch response.");
    }
  })
}
//Function to fetch APIninjas, the output will call the addDogAttributes function
function searchAPIninjas() {
  var url = "https://api.api-ninjas.com/v1/dogs?name=" + globalBreed;

  fetch(url, {headers: {"X-Api-Key": "CKcLibAK2M5dIXTKItimPA==3Hq30cdoiqtDbaO0"}})//calls Fetch API and uses requestURL as parameter, returns a promise
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      //fetch data now available (add functions)
        console.log(data);//debug to show fetch return
        if(data.length!=0) {
          swap = false;
          addDogAttributes(data);
        } else {
          var check = globalBreed.split(" ");
          if(check.length > 1 && swap == false) {//checks if the breed name is more than one word, if so then search different combinations
            swap = true;
            globalBreed = globalBreed.split(" ").reverse().join(" ");
            searchAPIninjas();
          } else {
            swap = false;
            dogAttrEl.text("");
            dogAttrEl.text("No result found!");
          }
        }
      })
    } else {
      alert("Error. Failed to fetch response.");
    }
  })
};
//Function to save
function save() {
  dogNames.push(globalBreed);
  localStorage.setItem("savedDogs", JSON.stringify(dogNames));
}
//Event listener for checkboxes
$('.modal-card-body').on('click','.checkbox', function(event){
  for (var i = 0; i < checkboxValues; i++) {
    if($(event.target).attr('index') == i) {
      if($(event.target).is(":checked")) {
        $(event.target).attr("value" + i, "true");
        myDogAttributes[i] = true;
      } else {
        $(event.target).attr("value" + i, "false");
        myDogAttributes[i] = false;
      }
    }
  }
});
//Event listener for find my soul dog button
$(".modal-card-foot").on("click", ".button", function(event) {
  if($(event.target).attr('id') == "searchBtn") {
    //store user checkbox input to array
    startEl.hide();
    searchEl.show();
    buttonsEl.show();
    searchDogAPI();
  }
});
//Event listener for next button
nextBtnEl.on("click", function(){
  searchDogAPI();
});
//Event listener for save button
saveBtnEl.on("click", save);