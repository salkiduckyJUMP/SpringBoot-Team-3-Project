function initialize(){
    //generate card decks
    animalCards();
    locationCards();
    staffCards();
    fosterCards();
    //make about 
    aboutUs();

    var video=document.getElementById("video");   

    $(video).on("click", function(e){
        if(video.muted){
            video.muted = false;
        }
        else{
            video.muted = true;
        }
    });
}

function animalCards(){
    //Grab HTML Placeholder
    var animals = document.getElementById("animals");
    //Open AJAX read from Controller Mappings
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/animalshelter/allAnimals", true);

    //Make the Carousel for Cards
    var carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carousel.classList.add("slide");
    carousel.classList.add("carousel-multi-item");
    carousel.setAttribute("data-ride", "carousel"); 
    carousel.id = "myCarousel";
        //Inner Carousel
        var inCarousel = document.createElement("div");
        inCarousel.classList.add("carousel-inner");
        inCarousel.setAttribute("role", "listbox");
    carousel.appendChild(inCarousel);

    //Card Deck Contains Cards
    var cardDeck;

    //Card Deck Header
    var header = document.createElement("h3");
    header.innerHTML = "Featured Animals";
    header.classList.add("font-weight-bold"); 
    header.classList.add("p-2");
    header.classList.add("d-flex");
    var topDiv = document.createElement("div");
    topDiv.classList.add("d-flex");
    topDiv.classList.add("flex-row");

    //Add Card Deck to Placeholder
    animals.appendChild(header);
    //animals.appendChild(topDiv);
    animals.appendChild(carousel);

    //Carousel Controls
    var carControls = document.createElement("div");
    carControls.classList.add("controls-top");
    var leftB = document.createElement("a");
    leftB.classList.add("btn-floating");
    leftB.classList.add("carousel-control-prev");
    leftB.setAttribute("role", "button");
    leftB.setAttribute("href", "#myCarousel");
    leftB.setAttribute("data-slide", "prev");
    leftB.innerHTML = "<span class='carousel-control-prev-icon'></span>";
    var rightB = document.createElement("a");
    rightB.classList.add("btn-floatng");
    rightB.classList.add("carousel-control-next");
    rightB.setAttribute("role", "button");
    rightB.setAttribute("href", "#myCarousel");
    rightB.setAttribute("data-slide", "next");
    rightB.innerHTML = "<span class='carousel-control-next-icon'></span>";
    carControls.appendChild(leftB);
    carControls.appendChild(rightB);
    carousel.appendChild(carControls);

    var cardID = 0;
    var groupID = 0;
    var newSet = false;
    //Read JSON
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            //Loop Through Animals
            data.forEach(element => {
                //Set Card Deck and Carousel Items to group of 4
                if (cardID % 4 == 0) {
                    newSet = true;
                    //Create Active Carousel Card Set
                    carosItem = document.createElement("div");
                    carosItem.classList.add("carousel-item");
                    carosItem.id = groupID;
                    groupID++;
                    console.log(groupID);
                    //
                    cardDeck = document.createElement("div");
                    cardDeck.classList.add("card-group");
                    cardDeck.classList.add("container-fluid");
                    if (cardID < 4) {
                        carosItem.classList.add("active");
                    }
                }
                //Create Card
                var card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("rounded");
                card.classList.add("bg-primary");
                card.classList.add("col-3");
                card.style.margin = "0.25rem";
                card.id = cardID;
                cardID++;
                //Create Card Components
                    //Header
                    var cardHead = document.createElement("div");
                    cardHead.classList.add("card-header");
                    cardHead.innerHTML = element.name;
                    //Image
                    var cardImg = document.createElement("img");
                    cardImg.classList.add("card-img-top");
                    cardImg.classList.add("card-body");
                    cardImg.src = element.imagePath;
                    cardImg.alt = "Animal Image";
                    cardImg.style.objectFit = "cover";
                    cardImg.style.maxHeight = "300px";
                    if(cardImg.src == null || cardImg.src == '')cardImg.src = 'images/noImage.gif';
                    cardImg.onerror = this.src = 'images/noImage.gif';
                    //Card Text
                    var cardTxt = document.createElement("p");
                    cardTxt.classList.add("card-text");
                    cardTxt.innerHTML = element.name + ' is a '+ element.gender + ' ' + element.breed + ' ' +  element.species + ' that is ' + element.age + ' years old. ';                    
                    //Card Footer and buttons
                    var cardFtr = document.createElement("div");
                    cardFtr.classList.add("card-footer");
                    var btnGroup = document.createElement("div");
                    btnGroup.classList.add("btn-group");
                        var update = document.createElement("button");
                        update.innerHTML = "Update Animal";
                        update.classList.add("btn");
                        update.classList.add("btn-success");
                        update.setAttribute("onclick", "updateAnimal(" + element.id + ")");
                        var del = document.createElement("button");
                        del.innerHTML = "Delete Animal";
                        del.classList.add("btn");
                        del.classList.add("btn-secondary");
                        del.setAttribute("onclick", "deleteAnimal(" + element.id + ")");
                    btnGroup.appendChild(update);
                    btnGroup.appendChild(del);
                    cardFtr.appendChild(btnGroup);
                    //Write Card
                    card.appendChild(cardHead);
                    card.appendChild(cardImg);
                    card.appendChild(cardTxt);
                    card.appendChild(cardFtr);
                cardDeck.appendChild(card);
                if(newSet){
                    carosItem.appendChild(cardDeck);
                    inCarousel.appendChild(carosItem);
                    newSet = false;
                }
            });    
        }
      };
    xhttp.send();
}

function locationCards(){
    //Grab HTML Placeholder
    var locations = document.getElementById("locations");
    //Open AJAX read from Controller Mappings
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/animalshelter/allShelters", true);

    //Make the Carousel for Cards
    var carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carousel.classList.add("slide");
    carousel.classList.add("carousel-multi-item");
    carousel.setAttribute("data-ride", "carousel"); 
    carousel.id = "locationCarousel";
        //Inner Carousel
        var inCarousel = document.createElement("div");
        inCarousel.classList.add("carousel-inner");
        inCarousel.setAttribute("role", "listbox");
    carousel.appendChild(inCarousel);

    //Card Deck Contains Cards
    var cardDeck;
 
    //Card Deck Header
    var header = document.createElement("h3");
    header.innerHTML = "Our Locations";
    header.classList.add("font-weight-bold");
    header.classList.add("p-2");
    var topDiv = document.createElement("div");
    topDiv.classList.add("d-flex");
    topDiv.classList.add("flex-row");

    //Add Deck to Placeholder
    locations.appendChild(header);
    //locations.appendChild(topDiv);
    locations.appendChild(carousel);

    //Carousel Controls
    var carControls = document.createElement("div");
    carControls.classList.add("controls-top");
    var leftB = document.createElement("a");
    leftB.classList.add("btn-floating");
    leftB.classList.add("carousel-control-prev");
    leftB.setAttribute("role", "button");
    leftB.setAttribute("href", "#locationCarousel");
    leftB.setAttribute("data-slide", "prev");
    leftB.innerHTML = "<span class='carousel-control-prev-icon'></span>";
    var rightB = document.createElement("a");
    rightB.classList.add("btn-floatng");
    rightB.classList.add("carousel-control-next");
    rightB.setAttribute("role", "button");
    rightB.setAttribute("href", "#locationCarousel");
    rightB.setAttribute("data-slide", "next");
    rightB.innerHTML = "<span class='carousel-control-next-icon'></span>";
    carControls.appendChild(leftB);
    carControls.appendChild(rightB);
    carousel.appendChild(carControls);

    //Create Active Carousel Card Set
    var carosItem;

    var cardID = 0;
    var groupID = 0;
    var newSet = false;
    //Read JSON
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            //Loop Through Locations
            data.forEach(element => {
                //Set Card Deck and Carousel Items to group of 4
                if (cardID % 4 == 0) {
                    newSet = true;
                    //Create Active Carousel Card Set
                    carosItem = document.createElement("div");
                    carosItem.classList.add("carousel-item");
                    carosItem.id = groupID;
                    groupID++;
                    console.log(groupID);
                    //
                    cardDeck = document.createElement("div");
                    cardDeck.classList.add("card-group");
                    cardDeck.classList.add("container-fluid");
                    if (cardID < 4) {
                        carosItem.classList.add("active");
                    }
                }
                //Create Card
                var card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("rounded");
                card.classList.add("bg-danger");
                card.classList.add("col-3");
                card.style.margin = "0.25rem";
                card.id = cardID;
                cardID++;
                //Create Card Components
                    //Header
                    var cardHead = document.createElement("div");
                    cardHead.classList.add("card-header");
                    cardHead.innerHTML = element.shelter_name;
                    //Image
                    var cardImg = document.createElement("img");
                    cardImg.classList.add("card-img-top");
                    cardImg.classList.add("card-body");
                    cardImg.src = element.image_path;
                    console.log(element.image_path);
                    cardImg.alt = "Location Image";
                    cardImg.style.objectFit = "cover";
                    cardImg.style.maxHeight = "300px";
                    if(element.image_path == null || element.image_path == '')cardImg.src = 'images/noImage.gif';
                    //Text
                    var cardTxt = document.createElement("p");
                    cardTxt.classList.add("card-text");
                    cardTxt.innerHTML = element.addressNo + ' ' + element.street + '<br>' + element.township + ' ' + element.state + ' ' + element.zip;
                    //Card Footer and Buttons
                    var cardFtr = document.createElement("div");
                    cardFtr.classList.add("card-footer");
                    var btnGroup = document.createElement("div");
                    btnGroup.classList.add("btn-group");
                        var update = document.createElement("button");
                        update.innerHTML = "Update Location";
                        update.classList.add("btn");
                        update.classList.add("btn-success");
                        update.setAttribute("onclick", "updateShelter(" + element.id + ")");
                        var del = document.createElement("button");
                        del.innerHTML = "Delete Location";
                        del.classList.add("btn");
                        del.classList.add("btn-secondary");
                        del.setAttribute("onclick", "deleteShelter(" + element.id + ")");
                    btnGroup.appendChild(update);
                    btnGroup.appendChild(del);
                    cardFtr.appendChild(btnGroup);
                    //Write Card
                    card.appendChild(cardHead);
                    card.appendChild(cardImg);
                    card.appendChild(cardTxt);
                    card.appendChild(cardFtr);
                cardDeck.appendChild(card);
                if(newSet){
                    carosItem.appendChild(cardDeck);
                    inCarousel.appendChild(carosItem);
                    newSet = false;
                }
            });    
        }
      };
    xhttp.send();
}

function staffCards(){
    //Grab HTML Placeholder
    var staff = document.getElementById("staff");
    //Open AJAX read from Controller Mappings
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/animalshelter/allStaff", true);

    //Make the Carousel for Cards
    var carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carousel.classList.add("slide");
    carousel.classList.add("carousel-multi-item");
    carousel.setAttribute("data-ride", "carousel"); 
    carousel.id = "staffCarousel";
        //Inner Carousel
        var inCarousel = document.createElement("div");
        inCarousel.classList.add("carousel-inner");
        inCarousel.setAttribute("role", "listbox");
    carousel.appendChild(inCarousel);

    //Card Deck Contains Cards
    var cardDeck;

    //Card Deck Header
    var header = document.createElement("h3");
    header.innerHTML = "Our Staff";
    header.classList.add("font-weight-bold");
    header.classList.add("p-2");
    var topDiv = document.createElement("div");
    topDiv.classList.add("d-flex");
    topDiv.classList.add("flex-row");

    //Add Card Deck to Placeholder
    staff.appendChild(header);
    //staff.appendChild(topDiv);
    staff.appendChild(carousel);

    //Carousel Controls
    var carControls = document.createElement("div");
    carControls.classList.add("controls-top");
    var leftB = document.createElement("a");
    leftB.classList.add("btn-floating");
    leftB.classList.add("carousel-control-prev");
    leftB.setAttribute("role", "button");
    leftB.setAttribute("href", "#staffCarousel");
    leftB.setAttribute("data-slide", "prev");
    leftB.innerHTML = "<span class='carousel-control-prev-icon'></span>";
    var rightB = document.createElement("a");
    rightB.classList.add("btn-floatng");
    rightB.classList.add("carousel-control-next");
    rightB.setAttribute("role", "button");
    rightB.setAttribute("href", "#staffCarousel");
    rightB.setAttribute("data-slide", "next");
    rightB.innerHTML = "<span class='carousel-control-next-icon'></span>";
    carControls.appendChild(leftB);
    carControls.appendChild(rightB);
    carousel.appendChild(carControls);

    //Create Active Carousel Card Set
    var carosItem;

    var cardID = 0;
    var groupID = 0;
    var newSet = false;
    //Read JSON
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            //Loop Through Staff
            data.forEach(element => {
                //Set Card Deck and Carousel Items to group of 4
                if (cardID % 4 == 0) {
                    newSet = true;
                    //Create Active Carousel Card Set
                    carosItem = document.createElement("div");
                    carosItem.classList.add("carousel-item");
                    carosItem.id = groupID;
                    groupID++;
                    console.log(groupID);
                    //
                    cardDeck = document.createElement("div");
                    cardDeck.classList.add("card-group");
                    cardDeck.classList.add("container-fluid");
                    if (cardID < 4) {
                        carosItem.classList.add("active");
                    }
                }
                //Create Card
                var card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("rounded");
                card.classList.add("bg-dark");
                card.classList.add("col-3");
                card.style.margin = "0.25rem";
                card.id = cardID;
                cardID++;
                //Create Card Components
                    //Header
                    var cardHead = document.createElement("div");
                    cardHead.classList.add("card-header");
                    cardHead.innerHTML = element.name;
                    //Image
                    var cardImg = document.createElement("img");
                    cardImg.classList.add("card-img-top");
                    cardImg.classList.add("card-body");
                    cardImg.src = element.imagePath;
                    cardImg.alt = "Staff Image";
                    cardImg.style.objectFit = "cover";
                    cardImg.style.maxHeight = "300px";
                    if(cardImg.src == null || cardImg.src == '')cardImg.src = 'images/noImage.gif';
                    //Text
                    var cardTxt = document.createElement("p");
                    cardTxt.classList.add("card-text");
                    cardTxt.innerHTML = element.name + ' is a ' + element.title;
                    //Card Footer and Buttons
                    var cardFtr = document.createElement("div");
                    cardFtr.classList.add("card-footer");
                    var btnGroup = document.createElement("div");
                    btnGroup.classList.add("btn-group");
                        var update = document.createElement("button");
                        update.innerHTML = "Update Staff";
                        update.classList.add("btn");
                        update.classList.add("btn-success");
                        update.setAttribute("onclick", "updateStaff(" + element.id + ")");
                        var del = document.createElement("button");
                        del.innerHTML = "Delete Staff";
                        del.classList.add("btn");
                        del.classList.add("btn-secondary");
                        del.setAttribute("onclick", "deleteStaff(" + element.id + ")");
                    btnGroup.appendChild(update);
                    btnGroup.appendChild(del);
                    cardFtr.appendChild(btnGroup);
                    //Write Card
                    card.appendChild(cardHead);
                    card.appendChild(cardImg);
                    card.appendChild(cardTxt);
                    card.appendChild(cardFtr);
                cardDeck.appendChild(card);
                if(newSet){
                    carosItem.appendChild(cardDeck);
                    inCarousel.appendChild(carosItem);
                    newSet = false;
                }
            });    
        }
      };
    xhttp.send();
}

function fosterCards(){
    //Grab HTML Placeholder
    var fosters = document.getElementById("fosters");
    //Open AJAX read from Controller Mappings
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/animalshelter/allFoster", true);

    //Make the Carousel for Cards
    var carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carousel.classList.add("slide");
    carousel.classList.add("carousel-multi-item");
    carousel.setAttribute("data-ride", "carousel"); 
    carousel.id = "fosterCarousel";
        //Inner Carousel
        var inCarousel = document.createElement("div");
        inCarousel.classList.add("carousel-inner");
        inCarousel.setAttribute("role", "listbox");
    carousel.appendChild(inCarousel);

    //Card Deck Contains Cards
    var cardDeck;

    //Card Deck Header
    var header = document.createElement("h3");
    header.innerHTML = "Foster Animals";
    header.classList.add("font-weight-bold");
    header.classList.add("p-2");
    var topDiv = document.createElement("div");
    topDiv.classList.add("d-flex");
    topDiv.classList.add("flex-row");

    //Add Card Deck to Placeholder
    fosters.appendChild(header);
    //fosters.appendChild(topDiv);
    fosters.appendChild(carousel);

    //Carousel Controls
    var carControls = document.createElement("div");
    carControls.classList.add("controls-top");
    var leftB = document.createElement("a");
    leftB.classList.add("btn-floating");
    leftB.classList.add("carousel-control-prev");
    leftB.setAttribute("role", "button");
    leftB.setAttribute("href", "#fosterCarousel");
    leftB.setAttribute("data-slide", "prev");
    leftB.innerHTML = "<span class='carousel-control-prev-icon'></span>";
    var rightB = document.createElement("a");
    rightB.classList.add("btn-floatng");
    rightB.classList.add("carousel-control-next");
    rightB.setAttribute("role", "button");
    rightB.setAttribute("href", "#fosterCarousel");
    rightB.setAttribute("data-slide", "next");
    rightB.innerHTML = "<span class='carousel-control-next-icon'></span>";
    carControls.appendChild(leftB);
    carControls.appendChild(rightB);
    carousel.appendChild(carControls);

    //Create Active Carousel Card Set
    var carosItem;

    var cardID = 0;
    var groupID = 0;
    var newSet = false;
    //Read JSON
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            //Loop through Fosters
            data.forEach(element => {
                //Set Card Deck and Carousel Items to group of 4
                if (cardID % 4 == 0) {
                    newSet = true;
                    //Create Active Carousel Card Set
                    carosItem = document.createElement("div");
                    carosItem.classList.add("carousel-item");
                    carosItem.id = groupID;
                    groupID++;
                    console.log(groupID);
                    //
                    cardDeck = document.createElement("div");
                    cardDeck.classList.add("card-group");
                    cardDeck.classList.add("container-fluid");
                    if (cardID < 4) {
                        carosItem.classList.add("active");
                    }
                }
                //Create the Card
                var card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("rounded");
                card.classList.add("bg-warning");
                card.classList.add("col-3");
                card.style.margin = "0.25rem";
                card.id = cardID;
                cardID++;
                //Create Card Components
                    //Head
                    var cardHead = document.createElement("div");
                    cardHead.classList.add("card-header");
                    cardHead.innerHTML = element.animalName;
                    //Image
                    var cardImg = document.createElement("img");
                    cardImg.classList.add("card-img-top");
                    cardImg.classList.add("card-body");
                    cardImg.src = element.imagePath;
                    cardImg.alt = "Foster Image";
                    cardImg.style.objectFit = "cover";
                    cardImg.style.maxHeight = "300px";
                    if(element.imagePath == null || element.imagePath == '')cardImg.src = 'images/noImage.gif';
                    cardImg.onerror = "this.onerror=null;this.src='/images/noImage';"
                    //Text
                    var cardTxt = document.createElement("p");
                    cardTxt.classList.add("card-text");
                    cardTxt.innerHTML = element.fosterDescription;                    
                    //Card Footer and Buttons
                    var cardFtr = document.createElement("div");
                    cardFtr.classList.add("card-footer");
                    var btnGroup = document.createElement("div");
                    btnGroup.classList.add("btn-group");
                        var update = document.createElement("button");
                        update.innerHTML = "Update Foster";
                        update.classList.add("btn");
                        update.classList.add("btn-success");
                        update.setAttribute("onclick", "updateFoster(" + element.id + ")");
                        var del = document.createElement("button");
                        del.innerHTML = "Delete Foster";
                        del.classList.add("btn");
                        del.classList.add("btn-secondary");
                        del.setAttribute("onclick", "deleteFoster(" + element.id + ")");
                    btnGroup.appendChild(update);
                    btnGroup.appendChild(del);
                    cardFtr.appendChild(btnGroup);
                    //Write Card
                    card.appendChild(cardHead);
                    card.appendChild(cardImg);
                    card.appendChild(cardTxt);
                    card.appendChild(cardFtr);
                cardDeck.appendChild(card);
                if(newSet){
                    carosItem.appendChild(cardDeck);
                    inCarousel.appendChild(carosItem);
                    newSet = false;
                }
            });    
        }
      };
    xhttp.send();
}

function deleteAnimal(id)
{
    var link = "/animalshelter/deleteAnimal/" + id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", link, true);

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var animals = document.getElementById("animals");
            animals.innerHTML = "";
            animalCards();
        }
      };

    xhttp.send(null);
}

function deleteStaff(id)
{
    var link = "/animalshelter/deleteStaff/" + id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", link, true);

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var staff = document.getElementById("staff");
            staff.innerHTML = "";
            staffCards();
        }
      };

    xhttp.send(null);
}

function deleteShelter(id)
{
    var link = "/animalshelter/deleteShelter/" + id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", link, true);

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var locations = document.getElementById("locations");
            locations.innerHTML = "";
            locationCards();
        }
      };

    xhttp.send(null);
}

function deleteFoster(id)
{
    var link = "/animalshelter/deleteFoster/" + id;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", link, true);

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var fosters = document.getElementById("fosters");
            fosters.innerHTML = "";
            fosterCards();
        }
      };

    xhttp.send(null);
}


function aboutUs(){
    var section = document.getElementById("aboutUs");
    section.classList.add("d-inline-flex");
    section.classList.add("d-flex");
    section.classList.add("flex-column");
    var header = document.createElement("h3");
    header.classList.add("p2");
    header.innerHTML = "About Us";
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", "/AboutUs.txt", true);
    txtFile.onreadystatechange = function() {
      if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
        if (txtFile.status === 200) {  // Makes sure it's found the file.
          allText = txtFile.responseText; 
          var content = document.createElement("p");
          content.classList.add("p2");
          content.innerText = txtFile.responseText;
          section.appendChild(content);
        }
      }
    }
    txtFile.send(null);
      var music = document.createElement("iframe");
      music.id = "video";
      music.allow = "autoplay";
      music.src = "https://www.youtube.com/embed/i1GmxMTwUgs?start=69&mute=0&autoplay=1&cc_load_policy=1"; 
      music.style.objectFit = "cover";
    section.appendChild(header);
    section.appendChild(music);
}

function addNewAnimal()
{
    var sendData = {
    "age": document.getElementById("formAge").value,
    "breed": document.getElementById("formBreed").value,
    "gender": document.getElementById("formGender").value,
    "imagePath": document.getElementById("formImage").value,
    "name": document.getElementById("formName").value,
    "size": document.getElementById("formSize").value,
    "species": document.getElementById("formSpecies").value,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("Post", "/animalshelter/addAnimal", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var animals = document.getElementById("animals");
            animals.innerHTML = "";
            animalCards();
            
            $("#myModal").modal('toggle');
        }
      };

    xhttp.send(JSON.stringify(sendData));
}

function addNewShelter()
{
    var sendData = {
    "zip": document.getElementById("formZip").value,
    "addressNo": document.getElementById("formAddress").value,
    "image_path": document.getElementById("formImage").value,
    "shelter_name": document.getElementById("formName").value,
    "state": document.getElementById("formState").value,
    "street": document.getElementById("formStreet").value,
    "township": document.getElementById("formTownship").value,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("Post", "/animalshelter/addShelter", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var locations = document.getElementById("locations");
            locations.innerHTML = "";
            locationCards();
            
            $("#myModal").modal('toggle');
        }
      };

    xhttp.send(JSON.stringify(sendData));
}

function addNewStaff()
{
    var sendData = {
    "name": document.getElementById("formName").value,
    "title": document.getElementById("formTitle").value,
    "imagePath": document.getElementById("formImage").value
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("Post", "/animalshelter/addStaff", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var staff = document.getElementById("staff");
            staff.innerHTML = "";
            staffCards();
            
            $("#myModal").modal('toggle');
        }
      };

    xhttp.send(JSON.stringify(sendData));
}

function addNewFoster()
{
    var sendData = {
    "animalName": document.getElementById("formName").value,
    "animalType": document.getElementById("formType").value,
    "estimatedDateOfBirth": document.getElementById("formDate").value,
    "fosterDescription": document.getElementById("formDescription").value,
    "imagePath": document.getElementById("formImage").value
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("Post", "/animalshelter/addFoster", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var fosters = document.getElementById("fosters");
            fosters.innerHTML = "";
            fosterCards();
            
            $("#myModal").modal('toggle');
        }
      };

    xhttp.send(JSON.stringify(sendData));
}

function createNewAnimal(link)
{
    var testExists = document.getElementById("myModal");

    if(testExists != null)
    {
        testExists.remove();
    }

    // Gets element to add
    var fosters = document.getElementById("pageLayout");

    // Creates main modal div
    var theModal = document.createElement("div");
    theModal.className = "modal fade"
    theModal.id = "myModal";

    fosters.appendChild(theModal);

    // Adds modal dialog
    var theModalDialog = document.createElement("div");
    theModalDialog.className = "modal-dialog modal-dialog-centered";

    theModal.appendChild(theModalDialog);

    // Adds modal content
    var theModalContent = document.createElement("div");
    theModalContent.className = "modal-content";

    theModalDialog.appendChild(theModalContent);

    // Adds modal header
    var theModalHeader = document.createElement("div");
    theModalHeader.className = "modal-header";

    theModalContent.appendChild(theModalHeader);
    
    // Adds close button of header
    var theModalHeaderButton = document.createElement("button");
    theModalHeaderButton.type = "button";
    theModalHeaderButton.className = "close";
    theModalHeaderButton.setAttribute("data-dismiss", "modal")
    theModalHeaderButton.innerHTML = "&times;";

    theModalHeader.appendChild(theModalHeaderButton);

    // Adds the body to modal
    var theModalBody = document.createElement("div");
    theModalBody.className = "modal-body";
    
    theModalContent.appendChild(theModalBody);

    // Adds the footer to modal
    var theModalfooter = document.createElement("div");
    theModalfooter.className = "modal-footer";

    theModalContent.appendChild(theModalfooter);

    // Adds the add button
    var theModalfooterButton = document.createElement("div");
    theModalfooterButton.id = "theAddButton"
    theModalfooterButton.type = "button";
    theModalfooterButton.className = "btn btn-success";
    theModalfooterButton.innerHTML = "Add";

    theModalfooter.appendChild(theModalfooterButton);
    
    switch(link)
    {
        case 'foster':
            // Adds H4 of header
            var theModalHeaderH4 = document.createElement("h4");
            theModalHeaderH4.className = "modal-title";
            theModalHeaderH4.innerText = "Add New Foster!";

            theModalHeader.prepend(theModalHeaderH4);

            // Adds form to body
            var theModalBodyForm = document.createElement("form");
            theModalBody.appendChild(theModalBodyForm);

            // Adds the Name form-------------------------------------------
                // Creates input group
                var theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                var theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                var theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Name";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                var theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formName";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
                
                //Validation -- input is valid
                var theModalBodyFormGroupValidationP = document.createElement("div");
                theModalBodyFormGroupValidationP.className="valid-feedback";
                theModalBodyFormGroupValidationP.innerHTML="Valid.";
                theModalBodyFormGroup1.append(theModalBodyFormGroupValidationP);
                
                //Validation -- input is invalid
                var theModalBodyFormGroupValidationN = document.createElement("div");
                theModalBodyFormGroupValidationN.className="invalid-feedback";
                theModalBodyFormGroupValidationN.innerHTML="Enter the foster's name!";
                theModalBodyFormGroup1.append(theModalBodyFormGroupValidationN);
            
            // Adds the Description form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Description";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formDescription";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Type form ------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Animal Type";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formType";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Image form ------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Image Link";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formImage";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Date form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Estimated Birth";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.placeholder = "YYYY-MM-DD"
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formDate";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

                
                theModalfooterButton.setAttribute("onclick", "addNewFoster()");
        break;

        case 'animal':
            // Adds H4 of header
            var theModalHeaderH4 = document.createElement("h4");
            theModalHeaderH4.className = "modal-title";
            theModalHeaderH4.innerText = "Add New Animal!";

            theModalHeader.prepend(theModalHeaderH4);

            // Adds form to body
            var theModalBodyForm = document.createElement("form");
            theModalBody.appendChild(theModalBodyForm);

            // Adds the Age form-------------------------------------------
                // Creates input group
                var theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                var theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                var theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Age";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                var theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formAge";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
                
                
            
            // Adds the Breed form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Breed";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formBreed";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Gender form ------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Gender";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the Select to group
                theModalBodyFormGroupText = document.createElement("select");
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formGender";
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

                    // Adds the Male to options
                    theModalBodyFormGroupSelect = document.createElement("option");
                    theModalBodyFormGroupSelect.innerHTML = "Male"
                    theModalBodyFormGroupText.append(theModalBodyFormGroupSelect);
                    
                    // Adds the Female to options
                    theModalBodyFormGroupSelect = document.createElement("option");
                    theModalBodyFormGroupSelect.innerHTML = "Female"
                    theModalBodyFormGroupText.append(theModalBodyFormGroupSelect);

            // Adds the Image form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Image";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formImage";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
                
            // Adds the Name form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Name";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formName";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Size form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Size";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formSize";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Species form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Species";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formSpecies";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

                theModalfooterButton.setAttribute("onclick", "addNewAnimal()");
        break;

        case 'shelter':
            // Adds H4 of header
            var theModalHeaderH4 = document.createElement("h4");
            theModalHeaderH4.className = "modal-title";
            theModalHeaderH4.innerText = "Add New Shelter!";

            theModalHeader.prepend(theModalHeaderH4);

            // Adds form to body
            var theModalBodyForm = document.createElement("form");
            theModalBody.appendChild(theModalBodyForm);

            // Adds the Name form-------------------------------------------
                // Creates input group
                var theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                var theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                var theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Name";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                var theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control"
                theModalBodyFormGroupText.id = "formName";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
            
            // Adds the Address Number form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Address Number";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formAddress";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Street form ------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Street";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formStreet";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Town form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Town";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formTownship";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Zip form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Zip";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formZip";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the State form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "State";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formState";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Image form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Image Path";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id = "formImage";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
                
                theModalfooterButton.setAttribute("onclick", "addNewShelter()");
        break;

        case 'staff':
            // Adds H4 of header
            var theModalHeaderH4 = document.createElement("h4");
            theModalHeaderH4.className = "modal-title";
            theModalHeaderH4.innerText = "Add New Staff Member!";

            theModalHeader.prepend(theModalHeaderH4);

            // Adds form to body
            var theModalBodyForm = document.createElement("form");
            theModalBody.appendChild(theModalBodyForm);

            // Adds the Name form-------------------------------------------
                // Creates input group
                var theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                var theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                var theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Name";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                var theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.id = "formName";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
            
            // Adds the Title form------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Title";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.id = "formTitle";
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);

            // Adds the Image form-------------------------------------------
                // Creates input group
                theModalBodyFormGroup1 = document.createElement("div");
                theModalBodyFormGroup1.className = "input-group mb-3 was-validated";
                theModalBodyForm.append(theModalBodyFormGroup1);

                theModalBodyFormGroup2 = document.createElement("div");
                theModalBodyFormGroup2.className = "input-group-prepend";
                theModalBodyFormGroup1.append(theModalBodyFormGroup2);

                // Creates input group span
                theModalBodyFormGroupSpan = document.createElement("span");
                theModalBodyFormGroupSpan.className = "input-group-text";
                theModalBodyFormGroupSpan.innerHTML = "Image";
                theModalBodyFormGroup2.append(theModalBodyFormGroupSpan);

                // Adds the text to group
                theModalBodyFormGroupText = document.createElement("input");
                theModalBodyFormGroupText.type = "text";
                theModalBodyFormGroupText.className = "form-control";
                theModalBodyFormGroupText.id="formImage";
                theModalBodyFormGroupText.required = true;
                theModalBodyFormGroup1.append(theModalBodyFormGroupText);
                
                theModalfooterButton.setAttribute("onclick", "addNewStaff()");
        break;
    }

    $("#myModal").modal()
}

(function ($) {
  "use strict";
  // Auto-scroll
  $('#myCarousel').carousel({
    interval: 5000
  });

  // Control buttons
  $('.next').click(function () {
    $('.carousel').carousel('next');
    return false;
  });
  $('.prev').click(function () {
    $('.carousel').carousel('prev');
    return false;
  });

  // On carousel scroll
  $("#myCarousel").on("slide.bs.carousel", function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;
    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide -
          (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end 
        if (e.direction == "left") {
          $(
            ".carousel-item").eq(i).appendTo(".carousel-inner");
        } else {
          $(".carousel-item").eq(0).appendTo(".carousel-inner");
        }
      }
    }
  });
})
(jQuery);