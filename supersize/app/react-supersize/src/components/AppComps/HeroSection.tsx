import React from 'react'
import Button from '../Button'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js';

type ActiveGame = {
    worldPda: PublicKey;
    worldId: BN;
    name: string;
    active_players: number;
    max_players: number;
    size: number;
    image: string;
    token: string;
};

interface HeroSectionProps {
  gameId: PublicKey | null
  gameEnded: number
  playerName: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  activeGames: ActiveGame[]
  buyIn: number
  setBuyIn: (value: number) => void
  expandlist: boolean
  setexpandlist: (value: boolean) => void
  openGameInfo: boolean[]
  setOpenGameInfo: (value: boolean[]) => void
  handleClick: (index: number) => void
  inputValue: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleImageClick: () => void
  joinGameTx: (game: ActiveGame) => void
  setbuildViewerNumber: (value: number) => void
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setActiveGames: any
}

function HeroSection({
  gameId,
  gameEnded,
  playerName,
  handleNameChange,
  activeGames,
  buyIn,
  setBuyIn,
  expandlist,
  setexpandlist,
  openGameInfo,
  setOpenGameInfo,
  handleClick,
  inputValue,
  handleInputChange,
  handleKeyPress,
  handleImageClick,
  joinGameTx,
  setbuildViewerNumber,
  handleSliderChange,
  setActiveGames
}: HeroSectionProps) {
    return (
        <div className={`
          flex -mt-10 h-[86vh]   
          justify-center              
          md:flex md:h-[75vh] md:mt-[9vh]
          ${gameId == null && gameEnded == 0 ? 'flex' : 'hidden'}
        `}>
            <div className="flex items-center justify-center w-screen min-h-screen absolute font-conthrax">
                <img 
                  className="relative w-[6vw] h-[50vh] -top-[14vw] -left-[11vw] opacity-30 -z-[1] transform-none
                            md:w-[30vw] md:-top-[14vw] md:-left-[12vw]"
                  src={`${process.env.PUBLIC_URL}/token.png`}
                  alt="Image"
                />
                <h1 className="text-[#eee] font-conthrax text-[5vw] -ml-[38vw] 
                               md:text-[5vw] md:-ml-[29vw] md:-mt-[27vw]">
                  SUPERSIZE
                </h1>
            </div>
            <div className="z-[2] flex justify-center items-center w-[60%] h-full -mt-[1vh] ">
                <div className="backdrop-brightness-95 grid grid-rows-[auto_auto] p-[11vh] grid-cols-[2fr_1fr_1fr] w-[60vw] fixed mt-[-7vw]
                md:w-[40vw] md:mt-[1vw]">
                    <div className="bg-white col-span-3 flex mb-2 h-10 items-center justify-center rounded-lg border border-[#DCDCDC] text-left mt-12 text-base font-['Terminus'] overflow-hidden">
                        <input
                            className="flex items-center w-[60%] justify-center text-left text-base border-none bg-transparent font-['Terminus'] overflow-hidden select-none outline-none"
                            type="text"
                            value={playerName}
                            onChange={handleNameChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="bg-white col-span-1 flex h-10 items-center  justify-center rounded-lg mt-4 mb-4 w-[110%] border border-[#DCDCDC] text-left text-base font-['Terminus'] overflow-hidden">
                        <div className="flex items-center ml-1 w-[90%] ">
                            <img 
                                src={activeGames[0] ? activeGames[0].image : `${process.env.PUBLIC_URL}/token.png`}
                                className="w-5 h-auto items-center justify-center"
                                alt="Image"
                            />
                            <div className="h-5 inline-block ml-2 mt-[3px]">
                                {activeGames[0] ? activeGames[0].token : "LOADING"}
                            </div>
                        </div>
                        <input
                            className="w-1/5 outline-none flex items-end justify-end text-right mr-4 text-base border-none bg-transparent font-['Terminus'] overflow-hidden select-none"
                            type="number"
                            value={buyIn}
                            onChange={(e) => setBuyIn(parseFloat(e.target.value))}
                            placeholder="0.1"
                            step="0.01"
                            min="0.1"
                        />
                    </div>
                    <div className="col-span-2 flex h-10 w-[90%] mt-4 ml-8 items-center justify-center  bg-black text-white font-['Terminus'] text-base overflow-hidden">
                        <input
                            type="range"
                            min="0.1"
                            max="10.01"
                            step="0.1"
                            value={buyIn}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                    </div>
                    <div className="col-span-1 inline-flex justify-start items-center ">
                        <div className="w-[30%] bg-white flex flex-col items-start justify-start rounded-xl fixed self-start" style={{ maxHeight: expandlist ? "25vh" : "auto", height: expandlist ? "25vh" : "auto" }}>
                            <div className={`flex flex-row w-full pt-[0.4em] ${!expandlist ? 'pb-[0.4em]' : 'pb-[0.15em]'} border-b border-[#5f5f5f] opacity-50 cursor-pointer hover:bg-[#FFEF8A] hover:opacity-100`}>
                                <div 
                                    onClick={() => { handleClick(0); }}
                                    className="w-[4vw] pt-[0.4em] items-center justify-center cursor-pointer self-start flex text-xl font-bold"
                                >
                                    {!openGameInfo[0] ? "+" : "-"}
                                </div>
                                <div className="flex flex-col text-base pt-[0.2em] overflow-hidden w-[80%] font-['Conthrax']">
                                    <span className="opacity-70 text-[0.7rem] mb-[5px]"></span>
                                    <span>{activeGames.length > 0 ? activeGames[0].name : "loading"}</span>
                                    {openGameInfo[0] ? (
                                        <>
                                            <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                players: {activeGames[0].active_players} / {activeGames[0].max_players}
                                            </span>
                                            <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                game size: {activeGames[0].size}
                                            </span>
                                            <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                game id: {activeGames[0].worldId.toString()}
                                            </span>
                                        </>
                                    ) : null}
                                </div>
                                <div 
                                    className="ml-auto w-[2vw] pt-[0.8em] items-center self-start justify-end mr-[1vw] cursor-pointer flex"
                                    onClick={(e) => { setexpandlist(!expandlist); setOpenGameInfo(new Array(activeGames.length).fill(false)); }}
                                >
                                    <svg 
                                        width="15" 
                                        height="9" 
                                        viewBox="0 0 10 6" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`w-[1vw] h-auto origin-center ${expandlist ? 'scale-y-[-1]' : 'scale-y-1'}`}
                                    >
                                        <path d="M5 6L9.33013 0H0.669873L5 6Z" fill="black" />
                                    </svg>
                                </div>
                            </div>
                            {expandlist ? (
                                <>
                                    <div className="fixed flex flex-col items-start w-[43%] overflow-y-auto rounded-t-lg bg-black border-b" style={{ maxHeight: expandlist ? "20vh" : "auto", height: "20vh" }}>
                                        {activeGames.map((item, index) => (
                                            <>
                                                <div 
                                                    className={`flex flex-row w-full pt-[0.4em] ${!expandlist ? 'pb-[0.4em]' : 'pb-[0.15em]'} border-b border-[#5f5f5f] opacity-50 cursor-pointer hover:bg-[#FFEF8A] hover:opacity-100`}
                                                >
                                                    <div 
                                                        className="w-[3.2vw] items-center justify-center cursor-pointer self-start mt-[0.7vh] text-xl font-bold flex"
                                                        onClick={() => { handleClick(index); }}
                                                    >
                                                        {!openGameInfo[index] ? "+" : "-"}
                                                    </div>
                                                    <div 
                                                        className="flex flex-col text-base overflow-hidden mb-[5px] mt-[0.15em] w-full font-['Conthrax']"
                                                        onClick={() => {
                                                            const copiedActiveGameIds: ActiveGame[] = [...activeGames];
                                                            const [item] = copiedActiveGameIds.splice(index, 1);
                                                            copiedActiveGameIds.unshift(item);
                                                            setActiveGames(copiedActiveGameIds);
                                                        }}
                                                    >
                                                        <span className="opacity-70 text-[0.7rem] mb-[5px]"></span>
                                                        <span>{item.name}</span>
                                                        {openGameInfo[index] ? (
                                                            <>
                                                                <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                                    players: {item.active_players} / {item.max_players}
                                                                </span>
                                                                <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                                    game size: {item.size}
                                                                </span>
                                                                <span className="opacity-70 text-[0.7rem] mb-[5px]">
                                                                    game id: {item.worldId.toString()}
                                                                </span>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                    <div className={`ml-auto w-[2vw] h-full items-center justify-end mr-[1vw] cursor-pointer ${index === 0 ? 'flex' : 'hidden'}`}>
                                                        <svg 
                                                            width="15" 
                                                            height="9" 
                                                            viewBox="0 0 10 6" 
                                                            fill="none" 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="w-[1vw] h-auto"
                                                        >
                                                            <path d="M5 6L9.33013 0H0.669873L5 6Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        ))}

                                    </div>
                                    <div className="w-[85%] h-[3.5vh] bg-white opacity-50 rounded-lg mb-[0.7vh] ml-[1vw] border border-[#5f5f5f] flex items-center cursor-pointer overflow-hidden" style={{ marginTop: "auto" }}>
                                        <img src={`${process.env.PUBLIC_URL}/magnifying-glass.png`} width="20px" height="auto" alt="Image" style={{ marginLeft: "0.6vw", width: "1vw" }} onClick={handleImageClick} />
                                        <input type="text" className="text-input" placeholder="Search by game id" style={{ background: "none", border: "none", marginRight: "1vw", height: "80%", width: "100%" }}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyPress}
                                        >
                                        </input>
                                    </div>
                                </>) : null}
                        </div>
                    </div>
                    <div className="inline-flex justify-end items-center mr-4">
                        <Button buttonClass="playButton" title={"Play"} onClickFunction={joinGameTx} args={[activeGames[0]]} />
                    </div>
                    <div className="inline-flex justify-end items-center mr-4">
                        <Button buttonClass="createGameButton" title={"Create Game"} onClickFunction={() => setbuildViewerNumber(5)} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection
