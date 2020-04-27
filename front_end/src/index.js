window.addEventListener("DOMContentLoaded", e => {
    let form = document.getElementById("form")

    fetch("http://localhost:3000/spins/recent").then(resp => resp.json()).then(
        content => {
            let recent = document.getElementById("recent-restaurant")
            content.forEach(restaurant => {

                li = document.createElement("li")
                li.innerHTML = `<a href=${restaurant.url} target="_blank">${restaurant.name}</a>`
                recent.append(li)

            })
        })

    fetch("http://localhost:3000/spins/popular").then(resp => resp.json()).then(
        content => {
            let popular = document.getElementById("popular-restaurant")
            content.forEach(restaurant => {

                li = document.createElement("li")
                li.innerHTML = `<a href=${restaurant.url} target="_blank">${restaurant.name}</a> Hits: ${restaurant.spun}`
                popular.append(li)

            })
        })


    document.addEventListener("click", e => {
        switch (true) {
            case (e.target.id === "yelp_search"):
                e.preventDefault()
                let form = document.getElementById("form")
                postToBackEnd(form)
                form.parentElement.remove()
                break;
        }
    })//end of click listener


})//end of DOMcontentloaded

function postToBackEnd(form) {

    let location = form.location.value
    let type = form.type.value
    let price = form.price.value

    let newSearch = { location, type, price }

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
            for (i = 0; i < search.length; i++) {
                //check if restaurant name is over 15 chars
                if (search[i].name.length > 15) {
                    let arr = search[i].name.split(" ")
                    resultsArray[i]["text"] = arr.slice(0, 2).join(" ")
                }
                else { resultsArray[i]["text"] = search[i].name }

                resultsArray[i]["id"] = search[i].id
            }
            let wheel = document.getElementById("wheel")
            wheel.hidden = false
            theWheel = new Winwheel({
                'numSegments': 8,     // Specify number of segments.
                'outerRadius': 212,   // Set outer radius so wheel fits inside the background.
                'textFontSize': 18,    // Set font size as desired.
                'segments':        // Define segments including colour and text.
                    resultsArray,
                'animation':           // Specify the animation to use.
                {
                    'type': 'spinToStop',
                    'duration': 5,     // Duration in seconds.
                    'spins': 8,     // Number of complete spins.
                    'callbackFinished': alertPrize
                }
            });


        })


}//end of postToBackEnd

function searchBusiness(indicatedSegment) {
    let businessId = indicatedSegment.id
    let searchSelection = { id: businessId }
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
            card.hidden = false

            let hours = { 1: "Closed", 2: "Closed", 3: "Closed", 4: "Closed", 5: "Closed", 6: "Closed", 7: "Closed" }
            restaurant.business_info.hours[0].open.forEach(day => {
                hours[day.day] = `${FormatTime(day.start)}-${FormatTime(day.end)}`
            })



            card.innerHTML = `
                <div id="card-title">
                    <h2><a href=${restaurant.business_info.url} target="_blank">${restaurant.business_info.name}</a></h2>
                </div>

                <div id="card-overall">
                    <div id="card-images">
                        <img src=${restaurant.business_info.image_url} width="300" height="300"><br><br>
                        <div id="thumbnails"></div>
                    </div>

                    <div id="card-details">
                    
                        <p> <span> Rating: </span> <img src="./assets/${restaurant.business_info.rating}.png" <span>&ensp;(${restaurant.business_info.review_count})</span></p>
                        <p><span>Open Now? </span> ${restaurant.business_info.hours[0].is_open_now ? "Open" : "Closed"}</p>
                        <p> <span>Phone Number: </span>${formatPhoneNumber(restaurant.business_info.phone)} </p>
                        <p> <span>Address:</span> ${restaurant.business_info.location.display_address[0]}, ${restaurant.business_info.location.display_address[1]}</p>

                        <table style="text-align: right"> 
                        <tr><th>Sunday</th><td>${hours[6]}</td></tr>
                        <tr><th>Monday</th><td>${hours[7]}</td></tr>
                        <tr><th>Tuesday</th><td>${hours[1]}</td></tr>
                        <tr><th>Wednesday</th><td>${hours[2]}</td></tr>
                        <tr><th>Thursday</th><td>${hours[3]}</td></tr>
                        <tr><th>Friday</th><td>${hours[4]}</td></tr>
                        <tr><th>Saturday</th><td>${hours[5]}</td></tr>
                        </table>
                
                        <button id="respin" onclick="toggleWheelAndCard()">Respin Wheel</button>
                        <button id="re-search" onclick="readdForm()">Search Again</button>

                    </div>

                </div>
                `



            let map = document.getElementById("map")
            map.innerHTML =
                `
                <iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=${restaurant.business_info.location.display_address}&key=AIzaSyBLJO5Se7usAdXjNZ4F6rwwV9K5xgyZNJg" allowfullscreen></iframe>
                `


            //load thumbnails
            let thumbnails = document.getElementById('thumbnails');
            restaurant.business_info.photos.forEach(photo => {
                let pic = document.createElement("img")
                pic.src = photo
                pic.height = "100"
                pic.width = "100"
                thumbnails.append(pic)
            })

            resetWheel()

        })
}//end of search business

//helper functions

function toggleWheelAndCard() {
    let card = document.getElementById("card")
    let wheel = document.getElementById("wheel")
    card.hidden = !card.hidden
    wheel.hidden = !wheel.hidden
}

function readdForm() {
    location.reload()
}

FormatTime = function (fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);

    return hours + ':' + minutes + amPm;
};


function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return ['(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

