import clsx from "clsx";
import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function StartScreen({
  gameStarted,
  setGameStarted,
}: {
  gameStarted: { started: boolean, daily: boolean },
  setGameStarted: (gameStarted: { started: boolean, daily: boolean }) => void
}) {
  function useMenuAnimation(gameStarted: { started: boolean, daily: boolean }) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(
        ".startButton",
        { opacity: gameStarted.started ? 0 : 1 },
        {
          duration: 0.2,
          delay: gameStarted.started ? stagger(.2, {from: gameStarted.daily ? "last" : "first"}) : 1,
        }
      );
      animate(
        scope.current,
        { top: gameStarted.started ? "40px" : "calc(50% - 175px)" },
        {
          duration: 0.5,
          delay: 0.5,
        }
      );

      animate(
        ".letter",
        { filter: gameStarted.started ? "contrast(0) opacity(20%)" : "contrast(1)" },
        {
          duration: 0.5,
          delay: 1,
        }
      );
      animate(
        "img",
        { filter: gameStarted.started ? "grayscale(1) opacity(20%)" : "grayscale(0)" },
        {
          duration: 0.5,
          delay: 1,
        }
      );
    }, [gameStarted.started]);

    return scope;
  }

  const scope = useMenuAnimation(gameStarted);

  return (
    <div
      ref={scope}
      className={clsx(
        "-translate-x-1/2 left-1/2 top-[calc(50%-175px)] absolute flex items-center justify-center flex-col",
        gameStarted && "pointer-events-none"
      )}
    >
      <img src="darklogo.svg" alt="logo" className="w-32 h-32 hidden dark:block" />
      <img src="lightlogo.svg" alt="logo" className="w-32 h-32 dark:hidden" />
      <h1 className="tracking-tighter flex gap-2 select-none">
        <span className="text-blue-500 letter">N</span>
        <span className="text-purple-400 letter">O</span>
        <span className="text-green-400 letter">O</span>
        <span className="text-orange-400 letter">D</span>
        <span className="text-red-400 letter">L</span>
        <span className="text-yellow-400 letter">E</span>
      </h1>
      <div className="flex gap-4 pointer-events-auto">
        <button className="startButton" onClick={() => setGameStarted({started: true, daily: false})}>
          FREE PLAY
        </button>
        <button className="startButton" onClick={() => setGameStarted({started: true, daily: true})}>
          DAILY CHALLENGE
        </button>
      </div>
    </div>
  );
}
