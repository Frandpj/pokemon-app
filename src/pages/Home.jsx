import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Home() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const data = await response.json();

            const detailedPokemon = await Promise.all(
                data.results.map(async (poke) => {
                    const detailsResponse = await fetch(poke.url);
                    const details = await detailsResponse.json();
                    return {
                        name: poke.name,
                        image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
                        type: details.types[0].type.name,
                        weight: details.weight / 10,
                        height: details.height / 10,
                    };
                })
            );
            setPokemon(detailedPokemon);
        };
        fetchPokemonDetails();
    }, []);

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar />
            <div className="ml-64 flex-1">
                <Navbar />
                <main className="p-10">
                    <header className="mb-10 text-center lg:text-left">
                        <h1 className="text-4xl font-black text-slate-800 italic uppercase">Main Expedition</h1>
                        <p className="text-slate-500 font-medium">Select a Pokémon to start your training session.</p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {pokemon.map((poke, index) => (
                            <PokemonCard
                                key={index}
                                {...poke}
                                onCatch={() => alert(`${poke.name} atrapado!`)}
                                onRelease={() => alert(`${poke.name} liberado!`)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;