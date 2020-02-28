window.addEventListener("DOMContentLoaded", e =>{
    let form = document.getElementById("form")
    
    
    document.addEventListener("click", e =>{
        switch(true) {
            case(e.target.id === "spin_button"):
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
    // .then(resp => resp.json())
    // .then(search => console.log)
    
}