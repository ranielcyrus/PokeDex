import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import PokemonListAPI from './PokemonListAPI';
import { Color } from './Color';

export const Pokemon = () => {
    const [pokemonDetails, setPokemonDetails] = useState('');
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the initial Pokémon list
        const getPokemonList = async () => {
            const list = await PokemonListAPI();
            return list;
        };

        const fetchPokemonDetails = async () => {
            const list = await getPokemonList();
            // Fetch details of the Pokémon with the given name
            const pokemon = list.find(pokemon => pokemon.name === name);
            if (pokemon) {
                try {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();
                    setPokemonDetails(data);
                } catch (error) {
                    console.error('There was an error', error);
                }
            }
        };

        fetchPokemonDetails();
    }, [name]);
 

    const handleBack = () => {
        navigate(-1)
    }

    const handleCry = () => {
        if (pokemonDetails && pokemonDetails.cries && pokemonDetails.cries.latest) {
            const audio = new Audio(pokemonDetails.cries.latest);
            audio.play();
        } else {
            console.error('No cry URL found');
        }
    };

    return (
        <div className='m-10'>
            {pokemonDetails ? (
                <div className={`flex flex-col justify-center items-center `}>
                    {
                        handleCry()
                    }
                    <div className='flex flex-col justify-center items-center bg-stone-300 p-8 rounded'>
                        <img src={pokemonDetails.sprites?.back_default} alt={pokemonDetails.name} className={`animate-bounce`} />
                        <h1>{pokemonDetails.name}</h1>
                        <p>Type(s): {pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                        <p>Height: {pokemonDetails.height}</p>
                        <p>Weight: {pokemonDetails.weight}</p>
                        <div className='mx-1'>
                            <button onClick={handleBack} className='mt-5 p-2 bg-blue-500 text-white rounded mx-3 w-20 hover:bg-blue-300'>Back</button>
                            <button onClick={handleCry} className='mt-5 p-2 bg-blue-500 text-white rounded mx-3 w-20 hover:bg-blue-300'>Cry</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
}