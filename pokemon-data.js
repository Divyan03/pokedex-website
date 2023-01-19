const search_term = document.getElementById('pokemon-search');
const search_btn = document.getElementById('search-btn');

const getPokemon = async (query) => {
    const url =`https://pokeapi.co/api/v2/pokemon/${query}`
    const res = await fetch(url)
    const pokemon = await res.json()
    console.log(pokemon)
    
    document.getElementById('pokemon-img').setAttribute('src', pokemon.sprites.other.home.front_default)
    document.getElementById('pokemon-name').innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  
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
  
}

search_btn.addEventListener('click', () => getPokemon(search_term.value.toLowerCase()))

