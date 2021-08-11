window.onload = init;
const alphabet = "abcdefghijklmnopqrstuvwxyz"

function getCountry() {

    var randomCharacter1 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var randomCharacter2 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var countryCode = randomCharacter1 + randomCharacter2;

    fetch('https://restcountries.eu/rest/v2/alpha/' + countryCode)
        .then(response => {
            if (response.status == 404 ) {
                getCountry();
                return;
            } else {
                return response.json();
            }
        })
        .then( country => { document.getElementById("countryInfo").innerHTML = country.name;
        });

}

function init() {
    document.getElementById("countryButton").addEventListener("click", getCountry);
}