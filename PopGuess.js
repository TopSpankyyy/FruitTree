window.onload = init;
const alphabet = "abcdefghijklmnopqrstuvwxyz"
var populationLeft = 0;
var populationRight = 0;

function getCountry(elementToUpdate) {
    //create random sequence of two letters
    var randomCharacter1 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var randomCharacter2 = alphabet[Math.floor(Math.random() * alphabet.length)]
    var countryCode = randomCharacter1 + randomCharacter2;

    //call API using letter sequence, throw out if 404 and retry until success
    //var countryName =
    var countryName = fetch('https://restcountries.eu/rest/v2/alpha/' + countryCode)
        .then(response => {
            if (response.status == 404 ) {
                getCountry(elementToUpdate);
            } else {
                return response.json();
            }
        })
        .then( country => {
            try {
                elementToUpdate.children[0].innerHTML = country.name + "      " + String(country.population);
                if (elementToUpdate.id == "countryInfoLeft") {
                    populationLeft = country.population;
                } else {
                    populationRight = country.population;
                }
            } catch(e) {
                console.log(e);
            }
            return;
        });

    return;
}

function checkHigher(elementToCheck, unguessed) {
    if (populationLeft > populationRight && elementToCheck.id == "countryInfoLeft") {
        console.log("Correct");
        getCountry(unguessed);
    } else if (populationLeft <= populationRight && elementToCheck.id == "countryInfoLeft") {
        console.log("WRONG");
        handleGame(false);
    }
}

function handleGame(isStarted) {
    var leftSide = document.getElementById("countryInfoLeft");
    var rightSide = document.getElementById("countryInfoLeft");

    if (!isStarted) {
        getCountry(leftSide);
        getCountry(rightSide);
    }
    document.getElementById("guessLeft").addEventListener("click", function() { checkHigher(leftSide, rightSide); });
}

function init() {
    handleGame(false);
}