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
        console.log(search)
        for (i=0; i < search.length; i++){
            resultsArray[i]["text"] = search[i].name
            resultsArray[i]["id"] = search[i].id
        }

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
            .then(restaurant => console.log(restaurant))
        }