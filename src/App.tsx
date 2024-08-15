import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import Game from "./Game";

function App() {
  const [gameStarted, setGameStarted] = useState({ started: false, daily: false, dailyPuzzle: });

  return (
    <>
      <StartScreen gameStarted={gameStarted} setGameStarted={setGameStarted} />
      {gameStarted.started && <Game gameStarted={gameStarted} setGameStarted={setGameStarted} />}
    </>
  );
}

export default App;
