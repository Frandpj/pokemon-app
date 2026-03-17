import React from 'react';

function Sidebar() {
    const menuItems = [
        { name: 'Catch Pokémon', icon: '⚾' },
        { name: 'Release Pokémon', icon: '🍃' },
        { name: 'View Stats', icon: '📊' }
    ];

    return (
        <aside className="bg-[#0f172a] text-slate-300 w-64 p-6 h-full fixed top-0 left-0 border-r border-slate-800 shadow-2xl">
            <div className="mb-10 mt-20">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Trainer Menu</h2>
                <ul className="space-y-3">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button className="w-full text-left p-3 rounded-xl bg-slate-800/50 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-3 group">
                                <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
                                <span className="text-sm font-medium">{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;