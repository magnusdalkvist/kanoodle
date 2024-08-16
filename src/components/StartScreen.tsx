import clsx from "clsx";
import { stagger, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function StartScreen({
  gameStarted,
  setGameStarted,
}: {
  gameStarted: { started: boolean; daily: boolean };
  setGameStarted: (gameStarted: { started: boolean; daily: boolean }) => void;
}) {
  function useMenuAnimation(gameStarted: { started: boolean; daily: boolean }) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
      animate(
        ".startButton",
        { opacity: gameStarted.started ? 0 : 1 },
        {
          duration: 0.2,
          delay: gameStarted.started
            ? stagger(0.2, { from: gameStarted.daily ? "last" : "first" })
            : 1,
        }
      );
      animate(
        ".how-to",
        { opacity: gameStarted.started ? 0 : 1 },
        {
          duration: 0.2,
          delay: gameStarted.started ? 0.1 : 1,
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

  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <div>
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
        <div className="grid grid-cols-2 gap-4 pointer-events-auto">
          <button
            className="startButton"
            onClick={() => setGameStarted({ started: true, daily: false })}
          >
            FREE PLAY
          </button>
          <button
            className="startButton"
            onClick={() => setGameStarted({ started: true, daily: true })}
          >
            DAILY CHALLENGE
          </button>
          <div
            onClick={() => {
              setShowHowTo(true);
            }}
            className="how-to text-center col-span-2 font-dots text-2xl uppercase hover:underline cursor-pointer"
          >
            How to play?
          </div>
        </div>
      </div>
      {showHowTo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowHowTo(false)}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold uppercase ml-4">How to play?</h1>
            <p className="mt-4">
              The game is called Noodle and it works similar to Kanoodle.
              <br />
              Your goal is to arrange the puzzle pieces to form a complete shape.
            </p>
            <ul className="pl-6 mt-4">
              {/* You can drag the piece with mouse or touch. if you press the piece you get the options to flip and rotate */}
              <li>Drag the piece with mouse or touch.</li>
              <li>Click the piece to see options for flipping and rotating.</li>
              <li className="mt-4">While dragging:</li>
              <li>Press A or D, or use the left and right arrow keys to rotate the piece.</li>
              <li>Press W or S, or use the up and down arrow keys to flip the piece.</li>
            </ul>
            <p className="mt-4">
              Have fun playing <span className="uppercase text-2xl font-dots">Noodle</span>!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
