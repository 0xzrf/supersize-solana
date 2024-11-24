import { PublicKey } from '@solana/web3.js';
import React from 'react'
import Button from '../Button';

interface NavbarProps {
    gameId: PublicKey | null;
    gameEnded: number;
    buildViewerNumber: number;
    isMobile: boolean;
    setIsDropdownOpen: any;
    isDropdownOpen: boolean;
    selectedOption: string;
    handleOptionClick: (option: string) => void;
    options: string[];
    setbuildViewerNumber: (value: number) => void;
    setIsHovered: (value: boolean[]) => void;
    isHovered: boolean[];
    footerVisible: boolean;
    activeGames: { image: string; token: string }[];
    WalletMultiButton: React.ComponentType;
}

function Navbar({
    gameId,
    gameEnded,
    buildViewerNumber,
    isMobile,
    setIsDropdownOpen,
    isDropdownOpen,
    selectedOption,
    handleOptionClick,
    options,
    setbuildViewerNumber,
    setIsHovered,
    isHovered,
    footerVisible,
    activeGames,
    WalletMultiButton,
}: NavbarProps) {
    return (
        <div className={`topbar flex items-center justify-between mb-0 h-[4vh] bg-black z-0 backdrop-blur-lg ${gameId == null && gameEnded == 0 ? "flex" : "none"} ${isMobile && buildViewerNumber == 1 ? 'h-[20vh]' : buildViewerNumber == 1 ? 'h-[10vh]' : 'h-[4vh]'} ${buildViewerNumber == 1 ? 'bg-black/30' : 'bg-black'}  z-[9999999]`} >
            {buildViewerNumber == 0 ? (
                <>
                    <div
                        className="relative inline-block cursor-pointer font-terminus select-none mt-[4vh] ml-[2vw] w-[120px]"
                        onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
                    >
                        <div className={`p-2.5 w-30 bg-black text-white border border-gray-300 rounded-lg text-center ${isDropdownOpen ? "open" : ""}`} style={{fontFamily: "Terminus"}}>
                            <span className="dot green-dot"/>
                            {selectedOption}
                        </div>
                        
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-[120px] bg-black border border-t-0 border-gray-300 rounded-b-[10px] shadow-lg z-[1]">
                                {options
                                    .filter((option) => option !== selectedOption)
                                    .map((option) => (
                                        <div
                                            key={option}
                                            className="dropdown-item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOptionClick(option);
                                            }}
                                        >
                                            <span className="dot red-dot" />
                                            <span className="dropdown-text"> {option} </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                    <span className="flex items-center justify-center text-center  h-12 rounded-[10px] mr-[1vw] font-bold text-[#ffef8a] border border-[#ffef8a] ml-0 w-fit pl-[10px] pr-[10px] mt-[5vh] bg-black" style={{ fontFamily: "Terminus"}}>Supersize is an eat or be eaten multiplayer game, live on the Solana blockchain</span>
                </>
            ) :
                (
                    <div>
                        <>
                            {buildViewerNumber == 1 ?
                                (
                                    <span className="text-white font-[Conthrax] text-5xl pl-[2vw] pt-[1vh] z-10 opacity-100 hover:cursor-pointer" onClick={(e) => { e.stopPropagation(); setbuildViewerNumber(0); }}> SUPERSIZE </span>
                                ) : (
                                    <div>
                                        <>
                                            <div
                                                className="w-[4vh] h-[4vh] mt-[4vh] ml-[2vw] flex items-center justify-center cursor-pointer"
                                                onMouseEnter={() => setIsHovered([false, false, false, false, false, true])}
                                                onMouseLeave={() => setIsHovered([false, false, false, false, false, false])}
                                                onClick={() => { setbuildViewerNumber(0); setIsHovered([false, false, false, false, false]); }}
                                            >
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/home.png`}
                                                    width="35px"
                                                    height="auto"
                                                    alt="Image"
                                                    className={`absolute ${isHovered[5] ? 'opacity-20' : 'opacity-80'} transition-[opacity,background,color] duration-300 ease-in-out`}
                                                />
                                                {isHovered[5] && (
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/homehighlight.png`}
                                                        width="35px"
                                                        height="auto"
                                                        alt="Highlighted Image"
                                                        className={`absolute opacity-${isHovered[5] ? '80' : '20'} transition-opacity duration-300 ease-in-out`}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    </div>)}
                        </>
                    </div>)
            }
            <div className="flex items-center justify-center z-[9999999]">
                <>
                    {buildViewerNumber != 1 ? (
                        <div className="wallet-buttons" style={{ marginTop: "3vh", zIndex: 9999999, display: "flex", alignItems: "center", gap: "4vh" }}>
                            <img src="/leaderboard.png" alt="leaderboard" style={{width: "6vh", height: "6vh", marginTop: "4vh", cursor: "pointer"}} onClick={() => { setbuildViewerNumber(4); }} />
                            <WalletMultiButton />
                        </div>
                    ) : (
                        <div className="play" style={{ display: footerVisible ? "none" : 'flex' }}>
                            <Button  buttonClass="playButton" title={"Play"} onClickFunction={() => { setbuildViewerNumber(0); }} args={[activeGames[0]]} />
                        </div>
                    )}
                </>
            </div>
        </div>
    )
}

export default Navbar
