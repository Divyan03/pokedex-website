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
    switch(pokemonUrl["generation"]["name"]){
        case "generation-v":
            entry = 5
            break
        case "generation-vi":
            entry = 6
            break
        case "generation-vii":
            entry = 7
            break
        case "generation-viii":
            entry = 7
            break
    }
    
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

    pokemonDesc = pokemonUrl["flavor_text_entries"][entry]["flavor_text"].replace("\f", " ").replace("POKéMON", "Pokémon")
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

