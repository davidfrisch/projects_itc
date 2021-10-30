let ring = document.getElementById('ring')
let hasTurn = false

function spin(){
    if(!hasTurn){
        ring.style.animation = 'spin 5s 1'
        hasTurn = true
    }else{
        hasTurn = false
        ring.style.animation = 'backspin 5s 1'
    }
}

