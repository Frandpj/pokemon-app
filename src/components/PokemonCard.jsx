import React, { useState } from 'react';

// Mapeo de estilos por tipo
const typeStyles = {
    fire: "bg-red-50 border-red-100 text-red-600 shadow-red-100",
    water: "bg-blue-50 border-blue-100 text-blue-600 shadow-blue-100",
    grass: "bg-green-50 border-green-100 text-green-600 shadow-green-100",
    electric: "bg-yellow-50 border-yellow-100 text-yellow-700 shadow-yellow-100",
    bug: "bg-lime-50 border-lime-100 text-lime-600 shadow-lime-100",
    normal: "bg-slate-50 border-slate-200 text-slate-600 shadow-slate-100",
    poison: "bg-purple-50 border-purple-100 text-purple-600 shadow-purple-100",
    ground: "bg-amber-50 border-amber-100 text-amber-700 shadow-amber-100",
    fairy: "bg-pink-50 border-pink-100 text-pink-600 shadow-pink-100",
    default: "bg-white border-gray-100 text-gray-600 shadow-gray-100"
};

function PokemonCard({ name, image, type, weight, height, onCatch, onRelease }) {
    const [isCatching, setIsCatching] = useState(false);

    // Seleccionamos el estilo basado en el tipo
    const style = typeStyles[type] || typeStyles.default;

    const handleCatch = () => {
        setIsCatching(true);
        setTimeout(() => {
            setIsCatching(false);
            onCatch();
        }, 2000);
    };

    return (
        <div className={`group relative border rounded-[2rem] p-5 transition-all duration-300 hover:-translate-y-2 overflow-hidden ${style}`}>
            {/* Decoración de fondo dinámica */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
                {/* Imagen con sombra dinámica */}
                <div className="relative h-32 flex items-center justify-center">
                    <img src={image} alt={name} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h2 className="text-xl font-black text-center capitalize mt-4 text-slate-800 tracking-tight">{name}</h2>

                <div className="flex justify-center my-2">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-inherit rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {type}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-bold uppercase">
                    <div className="bg-white/60 p-2 rounded-2xl text-center">
                        <p className="opacity-40">Weight</p>
                        <p className="text-slate-700">{weight} kg</p>
                    </div>
                    <div className="bg-white/60 p-2 rounded-2xl text-center">
                        <p className="opacity-40">Height</p>
                        <p className="text-slate-700">{height} m</p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        className="py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-tighter hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                        onClick={handleCatch}
                        disabled={isCatching}
                    >
                        {isCatching ? 'Wait...' : 'Catch'}
                    </button>
                    <button
                        className="py-2.5 bg-white/50 border-2 border-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-tighter hover:border-red-200 hover:text-red-500 transition-all"
                        onClick={onRelease}
                    >
                        Free
                    </button>
                </div>
            </div>
            {isCatching && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
                    <div className="w-16 h-16 animate-spin">
                        <img src="/src/assets/images/pokeball.png" alt="Catching..." className="w-full h-full" />
                    </div>
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mt-4 animate-pulse">
                        Capturing...
                    </p>
                </div>
            )}
        </div>
    );
}

export default PokemonCard;