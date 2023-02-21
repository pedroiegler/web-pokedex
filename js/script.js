const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const PokemonAbility = document.querySelector('.ability');
const ability = document.querySelector('.ability__pokemon')

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {

    var URL = 'https://pokeapi.co/api/v2/pokemon/';

    const APIResponse = await fetch(URL + pokemon);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        PokemonAbility.innerHTML = data['abilities']['1']['ability']['name'];
        input.value = '';
        searchPokemon = data.id;
    }
    else{
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        PokemonAbility.innerHTML = "Doesn't exist";
        pokemonName.innerHTML = 'Not found';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);