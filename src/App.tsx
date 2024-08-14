import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      <StartScreen gameStarted={gameStarted} setGameStarted={setGameStarted} />
    </>
  );
}

export default App;
