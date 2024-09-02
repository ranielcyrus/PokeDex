
const PokemonListAPI = async  () => {
    //function for fetching the initial list in the API
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); //limit fetching to 151
        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error("There was an error fetching the Pokémon list!", error);
        return [];
    }
    
}

export default PokemonListAPI;