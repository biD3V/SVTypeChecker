var forms;

class Pokemon {
    constructor(pokemonData) {
        this.natDex = pokemonData.Info.DexIndexNational;
        this.regionDex = pokemonData.Dex ? pokemonData.Dex.Index : null;
        this.form = pokemonData.Info.Form;
        this.types = (pokemonData.Type1 == pokemonData.Type2) ? [pokemonData.Type1] : [pokemonData.Type1,pokemonData.Type2];
    }
}

function loadForms() {
    readTextFile("./forms.json",function(text){
        forms = JSON.parse(text);
        return;
    });
}

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

function padNumber(padding,number) {
    return number.toString().padStart(padding, '0');
}

function pokemonForm(index,form) {
    var formID = "ZKN_FORM_" + padNumber(3,index) + "_" + padNumber(3,form)
    //console.log(`${formID}: ${data[formID]}`);
    if (forms[formID]) return ` (${forms[formID]})`;
    else return "";
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

async function listPokemonInGame(speciesList) {
    await loadForms();
    readTextFile("./personal_array.json", function(text){
        var data = JSON.parse(text);
        for (const pokemon in data.Table) {
            if (Object.hasOwnProperty.call(data.Table, pokemon)) {
                const element = data.Table[pokemon];
                const poke = new Pokemon(element);
    
                if (element.IsPresentInGame) {
                    var newDiv = document.createElement("p");
                    newDiv.setAttribute("class","pokemon");
                    newDiv.innerHTML = `${padNumber(3,poke.natDex)} <strong>${speciesList[poke.natDex]}</strong>${pokemonForm(poke.natDex,poke.form)} ${typeForPokemon(element)}`;
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