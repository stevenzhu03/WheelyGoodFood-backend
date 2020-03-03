window.addEventListener("DOMContentLoaded", e =>{
    let form = document.getElementById("form")
    
    
    document.addEventListener("click", e =>{
        switch(true) {
            case(e.target.id === "yelp_search"):
                e.preventDefault()
                let form = e.target.parentNode
                postToBackEnd(form)
                card.hidden = true //hide card when you press button again
                break;
        }

    })//end of click listener

    
})//end of DOMcontentloaded

function postToBackEnd(form){

    let location = form.location.value
    let type = form.type.value
    let price = form.price.value

    let newSearch = {location, type, price}

    fetch('http://localhost:3000/yelp', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(newSearch)
    })
    .then((response) => response.json())
    .then(search => {
        if(search == null){
            card.hidden = false
            card.innerHTML = "NO RESULTS, PLEASE TRY AGAIN"
        }
        for (i=0; i < search.length; i++){
            resultsArray[i]["text"] = search[i].name
            resultsArray[i]["id"] = search[i].id
        }
        let wheel = document.getElementById("wheel")
        wheel.hidden = false
        theWheel = new Winwheel({
            'numSegments'  : 8,     // Specify number of segments.
            'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
            'textFontSize' : 18,    // Set font size as desired.
            'segments'     :        // Define segments including colour and text.
            resultsArray,
            'animation' :           // Specify the animation to use.
            {
                'type'     : 'spinToStop',
                'duration' : 5,     // Duration in seconds.
                'spins'    : 8,     // Number of complete spins.
                'callbackFinished' : alertPrize
            }
        });
        
        
    })
    
    
}

        function searchBusiness(indicatedSegment){
            let businessId = indicatedSegment.id
            let searchSelection = {id: businessId}
            fetch('http://localhost:3000/yelp/business', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify(searchSelection)
            })
            .then(response => response.json())
            .then(restaurant => {
                let wheel = document.getElementById("wheel")
                wheel.hidden = true

                console.log(restaurant)
                let card = document.getElementById('card')
                card.hidden= false
                
                let hours ={1: "Closed", 2: "Closed", 3: "Closed", 4: "Closed", 5: "Closed", 6: "Closed", 7: "Closed"}
                restaurant.business_info.hours[0].open.forEach(day=>{
                    hours[day.day] = `${day.start}-${day.end}`
                })



                card.innerHTML=`
                <h2><a href=${restaurant.business_info.url} target="_blank">${restaurant.business_info.name}<a></h2>
                <img src=${restaurant.business_info.image_url} width="300" height="300">
                Open Now? ${restaurant.business_info.hours[0].is_open_now? "Open" : "Closed" }
                <h3> Rating: ${restaurant.business_info.rating} Stars</h3>
                <h3> Phone Number: ${restaurant.business_info.phone} </h3>
                <h3> Address: ${restaurant.business_info.location.display_address} </h3>
                <div id="thumbnails"></div>
                <br>
                <table style="text-align: right"> 
                <tr><th>Sunday</th><td>${hours[6]}</td></tr>
                <tr><th>Monday</th><td>${hours[7]}</td></tr>
                <tr><th>Tuesday</th><td>${hours[1]}</td></tr>
                <tr><th>Wednesday</th><td>${hours[2]}</td></tr>
                <tr><th>Thursday</th><td>${hours[3]}</td></tr>
                <tr><th>Friday</th><td>${hours[4]}</td></tr>
                <tr><th>Saturday</th><td>${hours[5]}</td></tr>
                </table>
                Reviews: 
                <ul id="reviews"></ul>
                <button onclick="toggleWheelAndCard()">Respin Wheel</button>
                `

                //load thumbnails
                let thumbnails = document.getElementById('thumbnails');
                restaurant.business_info.photos.forEach(photo=>{
                    let pic = document.createElement("img")
                    pic.src = photo
                    pic.height = "100"
                    pic.width = "100"
                    thumbnails.append(pic)
                })

                let reviews = document.getElementById('reviews');
                restaurant.reviews.forEach(review=>{
                    let pic = document.createElement("li")
                    pic.innerHTML = `"${review.text}"`
                    reviews.append(pic)
                })

            })
        }//end of search business

//helper functions

function toggleWheelAndCard(){
    let card = document.getElementById("card")
    let wheel = document.getElementById("wheel")
    card.hidden = !card.hidden
    wheel.hidden = !wheel.hidden
}



//google maps
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.706001, lng: -74.008804},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('LETS EAT HERE');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}