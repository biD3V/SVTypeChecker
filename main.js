function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function typeForPokemon(pokemon) {
    var types = ["Normal","Fighting","Flying","Poison","Ground","Rock","Bug","Ghost","Steel","Fire","Water","Grass","Electric","Psychic","Ice","Dragon","Dark","Fairy","???"];
    if (pokemon.Type1 != pokemon.Type2) return types[pokemon.Type1] + "," + types[pokemon.Type2];
    else return types[pokemon.Type1];
}

// function showForeignForms() {
//     const foreignForms = document.querySelector("#foreign");
//     return foreignForms.checked;
// }

// function reloadPokemon() {
//     var pokemonList = document.getElementsByClassName("pokemon");
//     for (const pokemon in pokemonList) {
//         if (Object.hasOwnProperty.call(pokemonList, pokemon)) {
//             const element = pokemonList[pokemon];
            
//             document.body.removeChild(element);
//         }
//     }

//     // readTextFile("./species.txt", function(text) {
//     //     var data = text.split("\r\n");
    
//     //     listPokemonInGame(data);
//     // });
// }

function listPokemonInGame(speciesList) {
    readTextFile("./personal_array.json", function(text){
        var data = JSON.parse(text);
        for (const pokemon in data.Table) {
            if (Object.hasOwnProperty.call(data.Table, pokemon)) {
                const element = data.Table[pokemon];
    
                if (element.IsPresentInGame && element.Dex) {
                    var newDiv = document.createElement("p");
                    newDiv.setAttribute("class","pokemon");
                    newDiv.innerHTML = "<strong>" + speciesList[element.Info.DexIndexNational] + "</strong> " + ((element.Info.Form > 0) ? ("(" + element.Info.Form + ") ") : " ") + typeForPokemon(element);
                    document.body.appendChild(newDiv);
                }
            }
        }
    });
}

readTextFile("./species_array.json", function(text) {
    var data = JSON.parse(text);

    listPokemonInGame(data);
});

function pokeSearch(pokemon) {
    for (const pokeIndex in document.getElementsByClassName("pokemon")) {
        if (Object.hasOwnProperty.call(document.getElementsByClassName("pokemon"), pokeIndex)) {
            const pokemonInst = document.getElementsByClassName("pokemon")[pokeIndex];
            
            if (pokemonInst.innerHTML.toLowerCase().indexOf(pokemon) > -1) {
                pokemonInst.style.display = "block";
            } else {
                pokemonInst.style.display = "none";
            }
        }
    }
}