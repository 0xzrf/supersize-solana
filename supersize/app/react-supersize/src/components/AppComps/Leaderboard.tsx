import React, { useState } from 'react';

interface Player {
    rank: number;
    name: string;
    total: number;
}

const players: Player[] = [
    { rank: 1, name: "Top1VM",  total: 228897624 },
    { rank: 2, name: "oRCNLD...DohgjM", total:17436402 },
    { rank: 3, name: "f×r", total: 14711066 },
    { rank: 4, name: "CL888P...ENthbj", total: 11188228 },
    { rank: 5, name: "tenko", total: 10392967 },
    { rank: 6, name: "DEG", total: 10088151 },
    { rank: 7, name: "maff", total: 9438682 },
    { rank: 8, name: "moropy", total: 8921661 },
    { rank: 9, name: "woo", total: 5942167 },
];

const Leaderboard: React.FC<{setbuildViewerNumber: (number: number) => void}> = ({setbuildViewerNumber}) => {
    const [season, setSeason] = useState({
        icon: "/usdc.png",
        name: "USDC"
    });   
    const [rank, setRank] = useState<number|null>(null);

    return (
        <div 
        className="bg-[#141A17] text-white p-[50px] px-[100px] h-screen overflow-auto font-['VT323'] font-normal">
            <svg 
                viewBox="0 0 1024 1024" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#fff" 
                style={{width: "24px", height: "24px", cursor: "pointer"}}
                onClick={() => {
                    setbuildViewerNumber(0);
                }}
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#fff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                    <path fill="#fff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                </g>
            </svg>
            <div className="mb-6 flex items-center">
                <select id="season" 
                        className="w-[200px] p-2 bg-transparent text-white border-[3px] border-white flex items-center"
                        value={season.name} 
                        onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setSeason({
                                icon: selectedOption.getAttribute('data-icon') || '',
                                name: e.target.value
                            });
                        }}>
                    <option 
                        value="USDC" 
                        className="bg-[#141A17]">
                        <div className="flex items-center">
                            <img src="/usdc.png" alt="USDC" className="w-6 h-6 mr-2" />
                            USDC
                        </div>
                    </option>
                    <option 
                        value="SOL" 
                        className="bg-[#141A17]">
                        <div className="flex items-center">
                            <img src="/bonk.png" alt="BONK" className="w-6 h-6 mr-2" />
                            SOL
                        </div>
                    </option>
                    <option 
                        value="AGLD"
                        className="bg-[#141A17]">
                        <div className="flex items-center">
                            <img src="/bonk.png" alt="BONK" className="w-6 h-6 mr-2" />
                            AGLD
                        </div>
                    </option>
                </select>
            </div>
            <div className="relative mt-12">
                <h2 className="absolute top-[-36px] left-[10px] font-['VT323'] text-[30px] bg-[#141A17] p-[10px] text-[#3BAC71]">
                    MY RANKING
                </h2>
                <div className="border border-white p-6 mb-6">
                    <div className="flex gap-8">
                        <div className="flex justify-center items-center w-1/2">
                            <div className="text-center mb-4">
                                <div className="text-[25px] opacity-80 mb-1 text-gray-400">Global Ranking</div>
                                <div className="text-[40px] text-[#3BAC71]">
                                    922 <span className="text-base opacity-80 text-white">/ 93,602</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-1/2">
                            <div className="text-center mb-4">
                                <div className="text-[25px] opacity-80 mb-1 text-gray-400">Total Points</div>
                                <div className="text-[40px] text-[#3BAC71]">387,514</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="w-full border-collapse">
                <thead className="w-screen border-b border-gray-500 text-2xl text-[#00FF00]">
                    <tr>
                        <th className="text-left p-3 opacity-80">Rank</th>
                        <th className="text-left p-3 opacity-80">Player</th>
                        <th className="text-right p-3 opacity-80">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, i) => (
                        <tr key={player.rank} onMouseEnter={() => setRank(i)} onMouseLeave={() => setRank(null)} className={`${rank === i ? 'bg-[#002200]' : 'bg-transparent'}`}>
                            <td className="text-left p-3 text-lg">{player.rank}</td>
                            <td className="text-left p-3 text-lg">
                                <div className="flex items-center">
                                    <span className="text-lg">{player.name}</span>
                                </div>
                            </td>
                            <td className="text-right p-3 text-lg">{player.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

