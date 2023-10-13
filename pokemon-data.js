const search_term = document.getElementById('pokemon-search');
const search_btn = document.getElementById('search-btn');

const getPokemon = async (query) => {
    const url =`https://pokeapi.co/api/v2/pokemon/${query}`
    let res = await fetch(url)
    const pokemon = await res.json()
    
    document.getElementById('pokemon-img').setAttribute('src', pokemon["sprites"]["other"]["official-artwork"]["front_default"])
    document.getElementById('pokemon-name').innerHTML = pokemon.name
    //document.getElementById('pokemon-species').innerHTML = pokemon["species"]["genus"][0]
    
    res = await fetch(pokemon["species"]["url"])
    let pokemonUrl = await res.json();
    console.log(pokemonUrl)
    let entry = 0
    for (let i = 0; i < pokemonUrl["flavor_text_entries"].length; i++) {
        if (pokemonUrl["flavor_text_entries"][i]["language"]["name"] == "en"){
            entry = i;
            break
        }   
    }
    pokemonDesc = pokemonUrl["flavor_text_entries"][entry]["flavor_text"].replace("\f", " ").replace("\n", "").replace("POKéMON", "Pokémon")
    
    let typesDiv = document.getElementById('pokemon-types')
    while(document.getElementById('pokemon-types').firstChild){
        typesDiv.firstChild.remove()
    }

    for(let i = 0; i < pokemon.types.length; i++){
        let typeSpan = document.createElement("span")
        typeSpan.innerText = pokemon.types[i].type.name.toUpperCase()
        typeSpan.classList.add("type-container")
        typeSpan.classList.add(pokemon.types[i].type.name)
        typesDiv.append(typeSpan)
    }

    document.getElementById('flavor-text').innerHTML = pokemonDesc
    
    let speciesNum = 0
    for (let i = 0; i < pokemonUrl["genera"].length; i++) {
        if (pokemonUrl["genera"][i]["language"]["name"] == "en"){
            speciesNum = i;
            break
        }   
    }
    
    document.getElementById('pokemon-species').innerHTML = pokemonUrl["genera"][speciesNum]["genus"]
  
}

search_btn.addEventListener('click', () => getPokemon(search_term.value.toLowerCase()))

