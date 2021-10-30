
let cities = ['Lausanne', 'Fribourg', 'Neuchatel']
let informationAboutCity = [
    'Lausanne is the capital city and biggest town of the canton of Vaud in Romandy, Switzerland. It is situated on the shores of Lake Léman (French: le Lac Léman). It faces the French town of Évian-les-Bains, with the Jura Mountains to its north-west. Lausanne is located 62 kilometres northeast of Geneva. Lausanne is the city where I grew up from 2 to 18 years, all my close friends live there.',
    'Friboug is the capital of the Swiss canton of Fribourg and the district La Sarine. It is located on both sides of the river Sarine, on the Swiss Plateau, and is a major economic, administrative and educational center on the cultural border between German and French Switzerland (Romandy). Its Old City, one of the best-maintained in Switzerland, sits on a small rocky hill above the valley of the Sarine. During 3 years, I studied Computer Science at the University of Fribourg.',
    'Neuchâtel is a town, a municipality, and the capital of the Swiss canton of Neuchâtel on Lake Neuchâtel.',]

//Default values of the city I lived
let cities_counter = 0
document.getElementById('h2-city-lived').textContent = cities[cities_counter]
document.getElementById('p-city-lived').textContent = informationAboutCity[cities_counter]

//Go to next city if position is not the last
function goToNextCity() {

    prevButton = document.getElementById('button-city-previous').style.visibility = 'visible'

    if (cities_counter < cities.length - 1) {
        cities_counter += 1
        changeCity(cities[cities_counter])
    }

    if (cities_counter === cities.length - 1) {
        nextButton = document.getElementById('button-city-next')
        nextButton.style.visibility = 'hidden'
    }

}

//Go to previous city if it is not position zero.
function goToPreviousCity() {

    document.getElementById('button-city-next').style.visibility = 'visible'

    if (cities_counter > 0) {
        cities_counter -= 1
        changeCity(cities[cities_counter])
    }

    if (cities_counter == 0) {
        preivousButton = document.getElementById('button-city-previous')
        preivousButton.style.visibility = 'hidden'
    }
}

//Change dynamically text and refresh Google Map
function changeCity() {
    iframeGMap = document.getElementById('iframe-gmap-lived')
    h2Cities = document.getElementById('h2-city-lived').textContent = cities[cities_counter]
    pCities = document.getElementById('p-city-lived').textContent = informationAboutCity[cities_counter]

    iframeGMap.src = 'https://maps.google.com/maps?q=' + cities[cities_counter] + "&t=&z=11&ie=UTF8&iwloc=&output=embed"
}



