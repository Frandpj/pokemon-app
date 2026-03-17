import React, { useState } from 'react';

function PokemonCard({ name, image, type, weight, height, onCatch, onRelease }) {
    const [isCatching, setIsCatching] = useState(false);

    const handleCatch = () => {
        setIsCatching(true);
        setTimeout(() => {
            setIsCatching(false);
            onCatch();
        }, 2000); // Animation duration
    };

    return (
        <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            {/* Fondo decorativo sutil */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors"></div>

            <div className="relative">
                <img src={image} alt={name} className="w-full h-32 object-contain drop-shadow-xl z-10" />
                <h2 className="text-xl font-black text-center capitalize mt-4 text-slate-800 tracking-tight">{name}</h2>

                <div className="flex justify-center my-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {type}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-bold uppercase text-slate-400">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <p>Weight</p>
                        <p className="text-slate-700">{weight} kg</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <p>Height</p>
                        <p className="text-slate-700">{height} m</p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                        className="py-2 bg-slate-900 text-slate-400 rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors"
                        onClick={handleCatch}
                        disabled={isCatching}
                    >
                        {isCatching ? 'Catching...' : 'Catch'}
                    </button>
                    <button
                        className="py-2 border-2 border-slate-100 text-slate-400 rounded-xl text-xs font-bold hover:border-red-200 hover:text-red-500 transition-all"
                        onClick={onRelease}
                    >
                        Free
                    </button>
                </div>
            </div>

            {isCatching && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <div className="w-16 h-16 animate-spin">
                        <img src="/pokeball.png" alt="Catching..." className="w-full h-full" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonCard;