import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import PokemonListAPI from './PokemonListAPI';
import { Color } from './Color';

export const FilterPokemon = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]); //initialize the container for each pokemon filtered by type
    const [pokemonDetails, setPokemonDetails] = useState([]); //initialize the container for each pokemon
    const { type } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the initial Pokémon list
        const getPokemonList = async () => {
            const list = await PokemonListAPI();
            setPokemonList(list);
        };
        
        getPokemonList();
    }, []);

    useEffect(() => {
        //function for fetching the indivial pokemon in the pokemonList that was populated by the API
        const fetchPokemonDetails = async () => {
            const details = [];
            for (const pokemon of pokemonList) {
                try {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();
                    details.push(data); 
                } catch (error) {
                    console.error(`There was an error`, error);
                }
            }
            setPokemonDetails(details); 
        };

        if (pokemonList.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonList]);

    useEffect(() => {
        const filterPokemonByType = () => {
            if (type === '') {
                setFilteredPokemon(pokemonDetails);
            } else {
                const filtered = pokemonDetails.filter(pokemon =>
                    pokemon.types.some(typeInfo => typeInfo.type.name === type)
                );
                setFilteredPokemon(filtered);
            }
        };

        filterPokemonByType();
    }, [pokemonDetails, type]);

    const nav = (navParam) => {
        navigate(`/pokemon/name/${navParam}`)
    }

    return (
        <>  
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-5 m-10'>
                {filteredPokemon.map((pokemon, index) => {
                    // Get the type for the current Pokémon
                    const typeColor = type;
                    // Determine the background color class
                    const bgColorClass = Color[typeColor];
                    return (
                        <div key={index} className={`${bgColorClass} flex flex-col items-center rounded hover:bg-stone-400`} onClick={() => nav(pokemon.name)}>
                                <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                                <h2>{pokemon.name}</h2>
                        </div>
                     );
                 })}
            </div>

        </>
    );
}