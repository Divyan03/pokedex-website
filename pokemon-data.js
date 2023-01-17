const search_term = document.getElementById('pokemon-search');
const search_btn = document.getElementById('search-btn');

const getPokemon = async (query) => {
    const url =`https://pokeapi.co/api/v2/pokemon/${query}`
    const res = await fetch(url)
    const pokemon = await res.json()
    console.log(pokemon)
    
    document.getElementById('pokemon-img').setAttribute('src', pokemon.sprites.other.home.front_default)
    document.getElementById('pokemon-name').innerHTML = pokemon.name
}

search_btn.addEventListener('click', () => getPokemon(search_term.value))

