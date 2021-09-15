
let cities = ['Lausanne', 'Fribourg', 'Neuchatel','Tel-Aviv']
let citisFlag = ['Switzerland','Switzerland','Switzerland','Israel']
let informationAboutCity = [
'About Lausanne', 
'About Fribourg', 
'About Neuchatel',
'About Tel-Aviv']

let cities_counter = 0

//Default values of the city I lived
document.getElementById('h2-city-lived').textContent = cities[cities_counter]
document.getElementById('p-city-lived').textContent = informationAboutCity[cities_counter]

function goToNextCity() {
    
    prevButton = document.getElementById('button-city-previous').style.visibility = 'visible'
            
    if (cities_counter < cities.length - 1) {
        cities_counter += 1
        changeCity(cities[cities_counter])
    } 
    
    if (cities_counter === cities.length -1) {
        nextButton = document.getElementById('button-city-next')
        nextButton.style.visibility = 'hidden'
    }

}

function goToPreviousCity() {

    document.getElementById('button-city-next').style.visibility = 'visible'   

    if (cities_counter > 0) {
        cities_counter -= 1
        changeCity(cities[cities_counter])
    } 
    
    if (cities_counter == 0)  {
        preivousButton = document.getElementById('button-city-previous')
        preivousButton.style.visibility = 'hidden'
    }
}


function changeCity() {
    iframeGMap = document.getElementById('iframe-gmap-lived')
    h2Cities = document.getElementById('h2-city-lived').textContent = cities[cities_counter]
    pCities = document.getElementById('p-city-lived').textContent = informationAboutCity[cities_counter]

    iframeGMap.src = 'https://maps.google.com/maps?q=' + cities[cities_counter] + "&t=&z=11&ie=UTF8&iwloc=&output=embed"
}



