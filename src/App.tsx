import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

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
