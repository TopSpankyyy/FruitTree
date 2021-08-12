window.onload = init;
const alphabet = "abcdefghijklmnopqrstuvwxyz"

function getCountry(elementToUpdate) {
    var randomCharacter1 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var randomCharacter2 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var countryCode = randomCharacter1 + randomCharacter2;

    var countryName = fetch('https://restcountries.eu/rest/v2/alpha/' + countryCode)
        .then(response => {
            if (response.status == 404 ) {
                getCountry(elementToUpdate);
                return;
            } else {
                return response.json();
            }
        })
        .then( country => {
            return elementToUpdate.innerHtml = country.name;
        });
}

function handleGame() {
    var leftSide = document.getElementById("countryInfo1");
    var rightSide = document.getElementById("countryInfo2");

    document.getElementById("countryButton").addEventListener("click", function() { getCountry(leftSide); });
    //getCountry(leftSide);
    //getCountry(rightSide);
}

function init() {

    handleGame();
}