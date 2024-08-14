import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      <StartScreen gameStarted={gameStarted} setGameStarted={setGameStarted} />
      {gameStarted && <Game gameStarted={gameStarted} />}
    </>
  );
}

export default App;
