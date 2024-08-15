import clsx from "clsx";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function StartScreen({
  gameStarted,
  setGameStarted,
}: {
  gameStarted: boolean;
  setGameStarted: (gameStarted: boolean) => void;
}) {
  function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(
        ".startButton",
        { opacity: isOpen ? 0 : 1 },
        {
          duration: 0.2,
          delay: isOpen ? 0 : 1,
        }
      );
      animate(
        scope.current,
        { top: isOpen ? "40px" : "calc(50% - 175px)" },
        {
          duration: 0.5,
          delay: 0.5,
        }
      );

      animate(
        ".letter",
        { filter: isOpen ? "contrast(0) opacity(20%)" : "contrast(1)" },
        {
          duration: 0.5,
          delay: 1,
        }
      );
      animate(
        "img",
        { filter: isOpen ? "grayscale(1) opacity(20%)" : "grayscale(0)" },
        {
          duration: 0.5,
          delay: 1,
        }
      );
    }, [isOpen]);

    return scope;
  }

  const scope = useMenuAnimation(gameStarted);

  return (
    <div ref={scope} className={clsx("-translate-x-1/2 left-1/2 absolute flex items-center justify-center flex-col", gameStarted && "pointer-events-none")}>
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
      <button className="startButton" onClick={() => setGameStarted(true)}>
        PLAY
      </button>
    </div>
  );
}
