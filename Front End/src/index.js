window.addEventListener("DOMContentLoaded", e =>{
    let form = document.getElementById("form")
    
    
    document.addEventListener("click", e =>{
        switch(true) {
            case(e.target.id === "spin_button"):
                e.preventDefault()
                break;
        }

    })//end of click listener

})//end of DOMcontentloaded