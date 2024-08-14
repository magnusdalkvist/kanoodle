import { motion, stagger, useAnimate, useDragControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SnapPoints } from "../types";
import { gamePieces } from "../data/gamePieces.json";

export default function Game({ gameStarted }: { gameStarted: boolean }) {
  const staggerMenuItems = stagger(0.1, { startDelay: 1.7 });

  function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(
        ".gameboard",
        { opacity: isOpen ? 1 : 0 },
        {
          duration: 0.5,
          delay: 1.2,
        }
      );

      animate(
        ".gamePiece",
        { opacity: isOpen ? 1 : 0 },
        {
          duration: 0.5,
          delay: isOpen ? staggerMenuItems : 0,
        }
      );
    }, [isOpen]);

    return scope;
  }

  const scope = useMenuAnimation(gameStarted);

  const gameBoard = useRef<HTMLDivElement | null>(null);
  const [snapPoints, setSnapPoints] = useState<SnapPoints>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [selectedObject, setSelectedObject] = useState<HTMLElement | null>(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    //get top left coordinates of each cell in gameBoard
    if (gameBoard.current) {
      const cells = gameBoard.current.children;
      const snapPoints: SnapPoints = [];
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i] as HTMLElement;
        const rect = cell.getBoundingClientRect();
        snapPoints.push({ x: rect.left, y: rect.top, occupied: false, occupiedBy: "" });
      }
      setSnapPoints(snapPoints);
      checkSnapPoints();
    }
  }, []);

  const checkSnapPoints = () => {
    if (snapPoints.length === 0) return;
    const gamePieces = document.querySelectorAll(".gamePieceCell");
    snapPoints.forEach((snapPoint, i) => {
      snapPoint.occupied = false;
      snapPoint.occupiedBy = "";

      gamePieces.forEach((gamePiece) => {
        if (
          snapPoint.x === gamePiece.getBoundingClientRect().left - 5 &&
          snapPoint.y === gamePiece.getBoundingClientRect().top - 5
        ) {
          snapPoint.occupied = true;
          snapPoint.occupiedBy = gamePiece.getAttribute("data-color")!;
        }
      });
    });
    if (snapPoints.every((snapPoint) => snapPoint.occupied == true)) {
      setGameWon(true);
    }
  };

  return (
    <div ref={scope} className="flex flex-col justify-center items-center">
      <div ref={gameBoard} className="grid gameboard opacity-0 grid-cols-11 grid-rows-5 border">
        {Array.from({ length: 55 }, (_, i) => {
          return <div key={i} className="gameCell w-10 h-10 border" />;
        })}
      </div>
      <div>
        {gamePieces.map((gamePiece, i) => (
          <GamePiece
            index={i}
            key={i}
            snapPoints={snapPoints}
            gameBoard={gameBoard}
            highestZIndex={highestZIndex}
            setHighestZIndex={setHighestZIndex}
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
            checkSnapPoints={checkSnapPoints}
          >
            {gamePiece.cells.map((cell, i) => (
              <div
                key={i}
                className={`gamePieceCell pointer-events-auto w-10 h-10 rounded-full scale-75 ${cell.color} col-start-${cell.colStart}`}
                data-color={cell.color}
              ></div>
            ))}
          </GamePiece>
        ))}
      </div>
      <div className="piecesContainer mx-auto max-w-[1200px] pointer-events-none absolute flex flex-wrap m-5 left-5 right-5 top-[calc(50%+266px/2)] bottom-5">
        {gamePieces.map((gamePiece, i) => (
          <div key={i} className="min-w-[180px] flex-1"></div>
        ))}
      </div>
      {gameWon && (
        <div className="fixed z-[10000000] inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-md text-5xl font-bold text-green-500 flex items-center justify-center">
          Perfect!
        </div>
      )}
    </div>
  );
}

function GamePiece({
  gameBoard,
  snapPoints,
  children,
  highestZIndex,
  setHighestZIndex,
  selectedObject,
  setSelectedObject,
  checkSnapPoints,
  index,
}: {
  gameBoard: React.RefObject<HTMLDivElement>;
  snapPoints: SnapPoints;
  children: React.ReactNode;
  highestZIndex: number;
  setHighestZIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedObject: HTMLElement | null;
  setSelectedObject: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  checkSnapPoints: () => void;
  index: number;
}) {
  const constraintsRef = useRef<HTMLElement | null>(null);
  const controls = useDragControls();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    constraintsRef.current = document.body;
  }, []);

  const [mouseDown, setMouseDown] = useState(false);

  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prevPositionRef = useRef<{ x: number; y: number; rotate: number; flip: boolean } | null>(
    null
  );

  const usedPositions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setRotate(Math.floor(Math.random() * 4) * 90);
    const scopeRect = scope.current.firstChild.getBoundingClientRect();
    const piecesContainer = document.querySelector(".piecesContainer").children[index].getBoundingClientRect();
    
    //put piece in center of piecesContainer
    setPosition({
      x: piecesContainer.left + piecesContainer.width / 2 - scopeRect.width / 2,
      y: piecesContainer.top + piecesContainer.height / 2 - scopeRect.height / 2,
    });
  }, []);

  const flipObject = () => {
    setFlip((prev) => !prev);
  };

  const rotateObject = (clockwise: boolean) => {
    const increment = clockwise ? -90 : 90;
    flip ? setRotate((prev) => prev - increment) : setRotate((prev) => prev + increment);
  };

  useEffect(() => {
    const childAnimation = animate(scope.current.firstChild, {
      rotateY: flip ? 0 : 180,
      rotateZ: rotate,
      origin: 0.5,
    });

    childAnimation.then(() => {
      console.log("flip/rotate changed");
      if (mouseDown) return;

      checkPiecePosition();
    });
  }, [flip, rotate]);

  useEffect(() => {
    if (mouseDown) return;
    console.log("position changed");
    const animation = animate(scope.current, {
      x: position.x,
      y: position.y,
      duration: 0.3,
    });

    animation.then(() => {
      checkSnapPoints();
    });

    const childAnimation = animate(scope.current.firstChild, {
      rotateY: flip ? 0 : 180,
      rotateZ: rotate,
      origin: 0.5,
    });

    childAnimation.then(() => {
      checkSnapPoints();
    });

    prevPositionRef.current = {
      x: position.x,
      y: position.y,
      rotate: rotate,
      flip: flip,
    };
  }, [position]);

  const checkPiecePosition = () => {
    console.log("Checking piece position");
    if (!gameBoard.current || !scope.current) return;

    const scopeRect = scope.current.firstChild.getBoundingClientRect();

    const gameBoardRect = gameBoard.current.getBoundingClientRect();
    const offsetX = scopeRect.left - scope.current.getBoundingClientRect().left;
    const offsetY = scopeRect.top - scope.current.getBoundingClientRect().top;

    const border = 20;

    const isInsideGameBoard =
      scopeRect.left >= gameBoardRect.left - border &&
      scopeRect.right <= gameBoardRect.right + border &&
      scopeRect.top >= gameBoardRect.top - border &&
      scopeRect.bottom <= gameBoardRect.bottom + border;

    const isTouchingGameBoard =
      scopeRect.left < gameBoardRect.right &&
      scopeRect.right > gameBoardRect.left &&
      scopeRect.top < gameBoardRect.bottom &&
      scopeRect.bottom > gameBoardRect.top;

    if (isInsideGameBoard) {
      const closestSnapPoint = snapPoints.reduce(
        (acc, snapPoint) => {
          const distance = Math.sqrt(
            (snapPoint.x - scopeRect.left) ** 2 + (snapPoint.y - scopeRect.top) ** 2
          );
          const fitsWithinGameBoard =
            snapPoint.x >= gameBoardRect.left &&
            snapPoint.y >= gameBoardRect.top &&
            snapPoint.x + scopeRect.width <= gameBoardRect.right &&
            snapPoint.y + scopeRect.height <= gameBoardRect.bottom;

          if (distance < acc.distance && fitsWithinGameBoard) {
            return { snapPoint, distance };
          }
          return acc;
        },
        { snapPoint: { x: 0, y: 0 }, distance: Infinity }
      );

      let isColliding = false;
      const children = scope.current.firstChild.children;
      console.log("running collision check");
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        const closestSnapPoint = snapPoints.reduce(
          (acc, snapPoint) => {
            const distance = Math.sqrt(
              (snapPoint.x - childRect.left) ** 2 + (snapPoint.y - childRect.top) ** 2
            );
            if (distance < acc.distance) {
              return { snapPoint, distance };
            }
            return acc;
          },
          { snapPoint: { x: 0, y: 0 }, distance: Infinity }
        );

        if (
          closestSnapPoint.snapPoint.occupied &&
          closestSnapPoint.snapPoint.occupiedBy !== children[i].getAttribute("data-color")
        ) {
          isColliding = true;
          break;
        }
      }

      console.log("collision check complete");

      if (isColliding) {
        console.log("Colliding");
        console.log(prevPositionRef.current, position);
        setPosition({
          x: prevPositionRef.current?.x,
          y: prevPositionRef.current?.y,
        });
        setRotate(prevPositionRef.current?.rotate!);
        setFlip(prevPositionRef.current?.flip!);
      } else {
        setPosition({
          x: closestSnapPoint.snapPoint.x - offsetX,
          y: closestSnapPoint.snapPoint.y - offsetY,
        });
        setRotate(rotate);
        setFlip(flip);
      }
    } else if (isTouchingGameBoard) {
      setPosition({
        x: prevPositionRef.current?.x,
        y: prevPositionRef.current?.y,
      });
      setRotate(prevPositionRef.current?.rotate!);
      setFlip(prevPositionRef.current?.flip!);
    } else {
      setPosition({
        x: scopeRect.left - offsetX,
        y: scopeRect.top - offsetY,
      });
      setRotate(rotate);
      setFlip(flip);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      rotateObject(false);
    }
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      rotateObject(true);
    }
    if (
      e.key === "f" ||
      e.key === "s" ||
      e.key === "w" ||
      e.key === "F" ||
      e.key === "S" ||
      e.key === "W" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === " "
    ) {
      flipObject();
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);

    // Remove event listener to "a" and "d" to rotate object
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      className="gamePiece opacity-0 grid absolute top-0 left-0 pointer-events-none justify-items-center"
      ref={scope}
      drag
      dragListener={true}
      dragControls={controls}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => {
        checkPiecePosition();
      }}
      onMouseDown={() => {
        scope.current.style.zIndex = highestZIndex;
        setHighestZIndex(highestZIndex + 1);
        setMouseDown(true);

        // Add event listener to "a" and "d" to rotate object
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mouseup", handleMouseUp);
      }}
      onDragStart={() => {
        console.log("drag start");
        setMouseDown(true);
        setSelectedObject(null);
      }}
    >
      <motion.div className="grid pointer-events-none">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onDoubleClick: () => {
              selectedObject == scope.current
                ? setSelectedObject(null)
                : setSelectedObject(scope.current);
            },
            style: {
              ...child.props.style,
              border: selectedObject === scope.current ? "2px solid white" : null,
            },
          })
        )}
      </motion.div>
      {selectedObject === scope.current && (
        <div className="flex gap-4 absolute pt-4 top-full pointer-events-auto">
          <div className="bg-gray-700 p-2 rounded-full" onClick={() => rotateObject(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
          </div>
          <div className="bg-gray-700 p-2 rounded-full" onClick={flipObject}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7 2.5a.5.5 0 0 0-.939-.24l-6 11A.5.5 0 0 0 .5 14h6a.5.5 0 0 0 .5-.5v-11zm2.376-.485a.5.5 0 0 1 .563.246l6 11A.5.5 0 0 1 15.5 14h-6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .376-.485zM10 4.461V13h4.658L10 4.46z" />
            </svg>
          </div>
          <div className="bg-gray-700 p-2 rounded-full" onClick={() => rotateObject(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
}
