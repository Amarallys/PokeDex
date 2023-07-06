import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/Cards'
import NavBar from '../components/Navbar'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'

export default function Home(name) {
    const [pokemons, setPokemons] = useState([]);
        useEffect(() => {
            getPokemons()
        }, [name]);
    const getPokemons = () => {    
        var endpoints = [];
        for (var i = 1; i < 150; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
    };

    const pokemonFilter = (name) => {
        var filteredPokemons = [];
        if (name === "") {
            getPokemons();
        }
        for (var i in pokemons) {
            if(pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i]);
            }
        }

        setPokemons(filteredPokemons);
    };

    return (
        <div>
            <NavBar pokemonFilter={pokemonFilter}/>
            <Container maxWidth={false}> 
                <Grid container spacing={2}>
                    {pokemons.map((pokemon) => (
                        <Grid item xs={2}>
                            <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
