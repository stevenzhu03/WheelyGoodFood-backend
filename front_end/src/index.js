window.addEventListener("DOMContentLoaded", e =>{
    let form = document.getElementById("form")
    
    
    document.addEventListener("click", e =>{
        switch(true) {
            case(e.target.id === "yelp_search"):
                e.preventDefault()
                let form = e.target.parentNode
                postToBackEnd(form)
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
        // console.log(search)
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
    
    
}//end of postToBackEnd

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

        let card = document.getElementById('card')
        card.hidden= false
        card.innerHTML=`
        <img src=${restaurant.business_info.image_url} width="300" height="300">
        <h2><a href=${restaurant.business_info.url}>${restaurant.business_info.name}<a></h2>
        <h3> Rating: ${restaurant.business_info.rating} </h3>
        <h3> Phone Number: ${restaurant.business_info.phone} </h3>
        <h3> Address: ${restaurant.business_info.location.display_address} </h3>
        <div id="thumbnails"></div>
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
            pic.innerHTML = review.text
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