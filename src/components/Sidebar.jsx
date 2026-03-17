import React from 'react';

function Sidebar({ caughtCount, onViewChange, currentView }) {
    const menuItems = [
        { id: 'all', name: 'Catch Pokémon', icon: '⚾', count: null },
        { id: 'team', name: 'My Team', icon: '🎒', count: caughtCount },
        { id: 'stats', name: 'View Stats', icon: '📊', count: null }
    ];

    return (
        <aside className="bg-[#0f172a] text-slate-300 w-64 p-6 h-full fixed top-0 left-0 border-r border-slate-800 shadow-2xl z-40">
            <div className="mb-10 mt-20">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6 px-2">Trainer Menu</h2>
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => item.id !== 'stats' && onViewChange(item.id)}
                                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group 
                  ${currentView === item.id
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                        : 'bg-slate-800/30 hover:bg-slate-800 text-slate-400'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-xl transition-transform ${currentView === item.id ? 'scale-110' : 'group-hover:scale-120'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-tight">{item.name}</span>
                                </div>
                                {item.count !== null && item.count > 0 && (
                                    <span className={`${currentView === item.id ? 'bg-white text-red-500' : 'bg-red-500 text-white'} text-[10px] px-2 py-1 rounded-full font-black`}>
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="absolute bottom-8 left-6 right-6 p-4 bg-slate-800/50 rounded-3xl border border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                        TR
                    </div>
                    <div>
                        <p className="text-xs font-black text-white uppercase tracking-tighter">Trainer Red</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Rank: Master</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;