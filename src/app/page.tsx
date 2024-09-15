'use client';

import RetroTitle from "../components/RetroTitle";
import UsernameInput from "../components/UsernameInput";
import GameModeSelector from "../components/GameModeSelector";
import GameBoard from "../components/GameBoard";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [gameMode, setGameMode] = useState<"easy" | "moderate" | "hard" | "rapid" | null>(null);

  const handleReturnHome = () => {
    setGameMode(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-green-400 font-mono">
      <RetroTitle />
      
      {!username && <UsernameInput onSubmit={setUsername} />}
      
      {username && !gameMode && (
        <GameModeSelector onSelect={setGameMode} />
      )}
      
      {username && gameMode && (
        <GameBoard 
          key={`${username}-${gameMode}`} 
          username={username} 
          mode={gameMode}
          onReturnHome={handleReturnHome}
        />
      )}
    </main>
  );
}
