import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [caughtPokemon, setCaughtPokemon] = useState([]);
    const [view, setView] = useState("all"); // "all" o "team"

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();
            const detailedPokemon = await Promise.all(
                data.results.map(async (poke) => {
                    const detailsResponse = await fetch(poke.url);
                    const details = await detailsResponse.json();
                    return {
                        id: details.id,
                        name: poke.name,
                        image: details.sprites.other['official-artwork'].front_default,
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

    const handleCatch = (poke) => {
        if (!caughtPokemon.find(p => p.id === poke.id)) {
            setCaughtPokemon([...caughtPokemon, poke]);
        }
    };

    const handleRelease = (id) => {
        setCaughtPokemon(caughtPokemon.filter(p => p.id !== id));
    };

    // LÓGICA DE FILTRADO DINÁMICA
    // Primero decidimos qué lista usar: todos o solo los capturados
    const baseList = view === "all" ? pokemon : caughtPokemon;

    // Luego aplicamos el buscador sobre esa lista
    const filteredPokemon = baseList.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poke.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            {/* Pasamos caughtCount y la función para cambiar de vista */}
            <Sidebar
                caughtCount={caughtPokemon.length}
                onViewChange={setView}
                currentView={view}
            />

            <div className="ml-64 w-full">
                <Navbar />

                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 uppercase italic">
                                {view === "all" ? "Expedición" : "Mi Equipo"}
                            </h1>
                            <p className="text-slate-500 font-medium font-mono text-sm uppercase tracking-widest">
                                {view === "all" ? `Disponibles: ${filteredPokemon.length}` : `En tu equipo: ${filteredPokemon.length}`}
                            </p>
                        </div>

                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder={`Buscar en ${view === "all" ? "la Pokédex" : "tu equipo"}...`}
                                className="w-full px-5 py-3 pl-12 bg-white border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:outline-none transition-all shadow-sm font-medium"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute left-4 top-3.5 text-xl grayscale opacity-50">🔍</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {filteredPokemon.map((poke) => (
                            <PokemonCard
                                key={poke.id}
                                {...poke}
                                onCatch={() => handleCatch(poke)}
                                onRelease={() => handleRelease(poke.id)}
                            />
                        ))}
                    </div>

                    {filteredPokemon.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <span className="text-6xl mb-4">{view === "all" ? "🔍" : "🎒"}</span>
                            <p className="text-xl font-bold">
                                {view === "all" ? "No hay resultados" : "Tu equipo está vacío. ¡Ve a capturar algunos!"}
                            </p>
                            {view === "team" && (
                                <button
                                    onClick={() => setView("all")}
                                    className="mt-4 text-red-500 font-bold hover:underline"
                                >
                                    Volver a la expedición
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;