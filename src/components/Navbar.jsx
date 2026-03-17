import React from 'react';

function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 text-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-gray-800 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Poké<span className="text-red-500">App</span></h1>
                </div>
                <ul className="flex space-x-8 font-bold text-sm uppercase">
                    <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-red-500 transition-colors">Pokedex</a></li>
                    <li><a href="#" className="hover:text-red-500 transition-colors">Items</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;