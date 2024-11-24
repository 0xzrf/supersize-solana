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
        <div style={{
            backgroundColor: "#141A17",
            color: "#fff",
            padding: "50px",
            paddingInline: "100px",
            minHeight: "100vh",
            fontFamily: '"VT323", monospace',
            fontWeight: 400,
            fontStyle: "normal"
        }}>
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
            <div style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}>
                <select id="season" 
                        style={{
                            width: "200px",
                            padding: "8px",
                            backgroundColor: "transparent",
                            color: "#fff",
                            border: "3px solid #fff",
                            display: "flex",
                            alignItems: "center"
                        }}
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
                       
                        style={{backgroundColor: "#141A17"}}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src="/usdc.png" alt="USDC" style={{width: "24px", height: "24px", marginRight: "8px"}} />
                            USDC
                        </div>
                    </option>
                    <option 
                        value="SOL" 
                        style={{backgroundColor: "#141A17"}}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src="/bonk.png" alt="BONK" style={{width: "24px", height: "24px", marginRight: "8px"}} />
                            SOL
                        </div>
                    </option>
                    <option 
                        value="AGLD"
                        style={{backgroundColor: "#141A17"}}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src="/bonk.png" alt="BONK" style={{width: "24px", height: "24px", marginRight: "8px"}} />
                            AGLD
                        </div>
                    </option>
                </select>
            </div>
            <div style={{position: "relative", marginTop: "60px"}}>
                <h2 style={{
                    position: "absolute",
                    top: "-36px",
                    left: "10px",
                    fontSize: "30px",
                    backgroundColor: "#141A17",
                    padding: "10px",
                    color:"#3BAC71"
                }}>
                    MY RANKING
                </h2>
                <div style={{ border: "1px solid #fff", padding: "24px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", gap: "32px" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%" }}>
                            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                                <div style={{ fontSize: "25px", opacity: 0.8, marginBottom: "4px", color: "gray" }}>Global Ranking</div>
                                <div style={{ fontSize: "40px", color: "#3BAC71" }}>
                                    922 <span style={{ fontSize: "16px", opacity: 0.8, color: "#fff" }}>/ 93,602</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%" }}>
                            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                                <div style={{ fontSize: "25px", opacity: 0.8, marginBottom: "4px", color: "gray" }}>Total Points</div>
                                <div style={{ fontSize: "40px", color: "#3BAC71" }}>387,514</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{width: "100vw", borderBottom: "1px solid gray", fontSize: "24px", color: "#00FF00"}}>
                    <tr>
                        <th style={{ textAlign: "left", padding: "12px", opacity: 0.8 }}>Rank</th>
                        <th style={{ textAlign: "left", padding: "12px", opacity: 0.8 }}>Player</th>
                        <th style={{ textAlign: "right", padding: "12px", opacity: 0.8 }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, i) => (
                        <tr key={player.rank} onMouseEnter={() => setRank(i)} onMouseLeave={() => setRank(null)} style={{ backgroundColor: rank === i ? "#002200" : "transparent" }}>
                            <td style={{ textAlign: "left", padding: "12px", fontSize: "18px" }}>{player.rank}</td>
                            <td style={{ textAlign: "left", padding: "12px", fontSize: "18px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ fontSize: "18px" }}>{player.name}</span>
                                </div>
                            </td>

                            <td style={{ textAlign: "right", padding: "12px", fontSize: "18px" }}>{player.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

