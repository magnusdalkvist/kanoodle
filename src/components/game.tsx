import { motion, useAnimate, useDragControls } from "framer-motion";
import { snap } from "gsap";
import React, { useEffect, useRef, useState } from "react";

export default function Game() {
  const gameBoard = useRef<HTMLDivElement | null>(null);
  const [snapPoints, setSnapPoints] = useState<
    Array<{ x: number; y: number; occupied: boolean; occupiedBy: HTMLElement | null }>
  >([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [selectedObject, setSelectedObject] = useState<HTMLElement | null>(null);

  useEffect(() => {
    //get top left coordinates of each cell in gameBoard
    if (gameBoard.current) {
      const cells = gameBoard.current.children;
      const snapPoints: Array<{
        x: number;
        y: number;
        occupied: boolean;
        occupiedBy: HTMLElement | null;
      }> = [];
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i] as HTMLElement;
        const rect = cell.getBoundingClientRect();
        snapPoints.push({ x: rect.left, y: rect.top, occupied: false, occupiedBy: null });
      }
      setSnapPoints(snapPoints);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("objectMoved", checkSnapPoints);
  }, [snapPoints]);

  const checkSnapPoints = () => {
    if (snapPoints.length === 0) return;
    const gamePieces = document.querySelectorAll(".gamePiece");
    snapPoints.forEach((snapPoint) => {
      snapPoint.occupied = false;
      snapPoint.occupiedBy = null;

      gamePieces.forEach((gamePiece) => {
        if (
          snapPoint.x === gamePiece.getBoundingClientRect().left - 5 &&
          snapPoint.y === gamePiece.getBoundingClientRect().top - 5
        ) {
          snapPoint.occupied = true;
          snapPoint.occupiedBy = gamePiece as HTMLElement;
        }
      });
    });
    if (snapPoints.every((snapPoint) => snapPoint.occupied == true)) {
      console.log("You win!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div ref={gameBoard} className="grid grid-cols-11 grid-rows-5 border">
        {Array.from({ length: 55 }, (_, i) => {
          // add top left coordinates from bounding client to snapPoints
          return <div key={i} className="gameCell w-10 h-10 border" />;
        })}
      </div>
      <div className="flex flex-wrap max-w-[570px] justify-center items-center">
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-blue-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-blue"
          ></div>
          <div
            className="gamePiece bg-blue-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-blue"
          ></div>
          <div
            className="gamePiece bg-blue-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-blue"
          ></div>
          <div
            className="gamePiece bg-blue-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-blue"
          ></div>
          <div
            className="gamePiece bg-blue-500 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="dark-blue"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-purple-400 w-10 h-10 rounded-full scale-75"
            data-color="purple"
          ></div>
          <div
            className="gamePiece bg-purple-400 w-10 h-10 rounded-full scale-75"
            data-color="purple"
          ></div>
          <div
            className="gamePiece bg-purple-400 w-10 h-10 rounded-full scale-75"
            data-color="purple"
          ></div>
          <div
            className="gamePiece bg-purple-400 w-10 h-10 rounded-full scale-75"
            data-color="purple"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-green-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="green"
          ></div>
          <div
            className="gamePiece bg-green-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="green"
          ></div>
          <div
            className="gamePiece bg-green-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="green"
          ></div>
          <div
            className="gamePiece bg-green-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="green"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-orange-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="orange"
          ></div>
          <div
            className="gamePiece bg-orange-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="orange"
          ></div>
          <div
            className="gamePiece bg-orange-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="orange"
          ></div>
          <div
            className="gamePiece bg-orange-400 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="orange"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-blue-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="light-blue"
          ></div>
          <div
            className="gamePiece bg-blue-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="light-blue"
          ></div>
          <div
            className="gamePiece bg-blue-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="light-blue"
          ></div>
          <div
            className="gamePiece bg-blue-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="light-blue"
          ></div>
          <div
            className="gamePiece bg-blue-300 w-10 h-10 rounded-full scale-75 col-start-3"
            data-color="light-blue"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-red-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="red"
          ></div>
          <div
            className="gamePiece bg-red-400 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="red"
          ></div>
          <div
            className="gamePiece bg-red-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="red"
          ></div>
          <div
            className="gamePiece bg-red-400 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="red"
          ></div>
          <div
            className="gamePiece bg-red-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="red"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-gray-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="gray"
          ></div>
          <div
            className="gamePiece bg-gray-300 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="gray"
          ></div>
          <div
            className="gamePiece bg-gray-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="gray"
          ></div>
          <div
            className="gamePiece bg-gray-300 w-10 h-10 rounded-full scale-75 col-start-3"
            data-color="gray"
          ></div>
          <div
            className="gamePiece bg-gray-300 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="gray"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-green-500 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="dark-green"
          ></div>
          <div
            className="gamePiece bg-green-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-green"
          ></div>
          <div
            className="gamePiece bg-green-500 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="dark-green"
          ></div>
          <div
            className="gamePiece bg-green-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-green"
          ></div>
          <div
            className="gamePiece bg-green-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="dark-green"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-pink-500 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="pink"
          ></div>
          <div
            className="gamePiece bg-pink-500 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="pink"
          ></div>
          <div
            className="gamePiece bg-pink-500 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="pink"
          ></div>
          <div
            className="gamePiece bg-pink-500 w-10 h-10 rounded-full scale-75 col-start-3"
            data-color="pink"
          ></div>
          <div
            className="gamePiece bg-pink-500 w-10 h-10 rounded-full scale-75 col-start-3"
            data-color="pink"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-rose-200 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="rose"
          ></div>
          <div
            className="gamePiece bg-rose-200 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="rose"
          ></div>
          <div
            className="gamePiece bg-rose-200 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="rose"
          ></div>
          <div
            className="gamePiece bg-rose-200 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="rose"
          ></div>
          <div
            className="gamePiece bg-rose-200 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="rose"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-white w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="white"
          ></div>
          <div
            className="gamePiece bg-white w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="white"
          ></div>
          <div
            className="gamePiece bg-white w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="white"
          ></div>
        </Object>
        <Object
          snapPoints={snapPoints}
          gameBoard={gameBoard}
          highestZIndex={highestZIndex}
          setHighestZIndex={setHighestZIndex}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        >
          <div
            className="gamePiece bg-yellow-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="yellow"
          ></div>
          <div
            className="gamePiece bg-yellow-400 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="yellow"
          ></div>
          <div
            className="gamePiece bg-yellow-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="yellow"
          ></div>
          <div
            className="gamePiece bg-yellow-400 w-10 h-10 rounded-full scale-75 col-start-1"
            data-color="yellow"
          ></div>
          <div
            className="gamePiece bg-yellow-400 w-10 h-10 rounded-full scale-75 col-start-2"
            data-color="yellow"
          ></div>
        </Object>
      </div>
    </div>
  );
}

function Object({
  gameBoard,
  snapPoints,
  children,
  highestZIndex,
  setHighestZIndex,
  selectedObject,
  setSelectedObject,
}) {
  const [scope, animate] = useAnimate();
  const constraintsRef = useRef<HTMLElement | null>(null);
  const controls = useDragControls();

  const [prevPos, setPrevPos] = useState({ x: 0, y: 0, rotate: 0, flip: 0 });

  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(0);

  const flipObject = () => {
    setFlip((prev) => (prev == 180 ? 0 : 180));
  };

  const rotateObject = (reverse?: boolean) => {
    console.log("rotate", reverse, flip);
    let rotateAmount = reverse ? 90 : -90;
    setRotate((prev) => prev + rotateAmount);
    if (mouseIsDown) return;
    setTimeout(() => {
      mouseUp();
    }, 500);
  };

  useEffect(() => {
    constraintsRef.current = document.body;
  }, []);

  const mouseUp = () => {
    setMouseIsDown(false);

    scope.current.removeAttribute("dragging");

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
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        const closestSnapPoint = snapPoints.reduce(
          (acc, snapPoint) => {
            const distance = Math.sqrt(
              (snapPoint.x - childRect.left) ** 2 + (snapPoint.y - childRect.top) ** 2
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

        if (
          closestSnapPoint.distance < 20 &&
          closestSnapPoint.snapPoint.occupied &&
          closestSnapPoint.snapPoint.occupiedBy.getAttribute("data-color") !==
            children[i].getAttribute("data-color")
        ) {
          isColliding = true;
          break;
        }
      }

      if (isColliding) {
        console.log("Colliding");
        animate(scope.current, {
          x: prevPos.x,
          y: prevPos.y,
        });
        animate(scope.current.firstChild, {
          rotate: prevPos.rotate,
          flip: prevPos.flip,
        });
      } else {
        animate(scope.current, {
          x: closestSnapPoint.snapPoint.x - offsetX,
          y: closestSnapPoint.snapPoint.y - offsetY,
        });
        console.log("Moved to snap point");
        setPrevPos({
          x: closestSnapPoint.snapPoint.x - offsetX,
          y: closestSnapPoint.snapPoint.y - offsetY,
          rotate: rotate,
          flip: flip,
        });
      }
    } else if (isTouchingGameBoard) {
      console.log("Touching game board");
      animate(scope.current, {
        x: prevPos.x,
        y: prevPos.y,
      });
      animate(scope.current.firstChild, {
        rotate: rotate,
        flip: flip,
      })
    }

    setTimeout(() => dispatchEvent(new CustomEvent("objectMoved")), 500);
  };

  useEffect(() => {
    console.log(prevPos);
  }, [prevPos]);

  return (
    <motion.div
      className="grid absolute top-0 left-0 pointer-events-none justify-items-center"
      ref={scope}
      animate={{ rotateY: 0, x: 0, y: 0 }}
      drag
      dragListener={false}
      dragControls={controls}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onMouseDown={() => {
        scope.current.style.zIndex = highestZIndex;
        setHighestZIndex(highestZIndex + 10);

        console.log("saved pos")
        setPrevPos({
            x: scope.current.getBoundingClientRect().left,
            y: scope.current.getBoundingClientRect().top,
            rotate: prevPos.rotate,
            flip: prevPos.flip,
          });

        scope.current.setAttribute("dragging", "");

        // Define the event listener functions
        const handleKeyDownA = (e: KeyboardEvent) => {
          if (e.key === "a") rotateObject(flip != 180);
        };

        const handleKeyDownD = (e: KeyboardEvent) => {
          if (e.key === "d") rotateObject(flip == 180);
        };

        const handleKeyDownWS = (e: KeyboardEvent) => {
          if (e.key === "w" || e.key === "s") flipObject();
        };

        // Add the event listeners
        window.addEventListener("keydown", handleKeyDownA);
        window.addEventListener("keydown", handleKeyDownD);
        window.addEventListener("keydown", handleKeyDownWS);

        // When pointer is up, remove event listeners
        const handleMouseUp = () => {
            window.removeEventListener("keydown", handleKeyDownA);
            window.removeEventListener("keydown", handleKeyDownD);
            window.removeEventListener("keydown", handleKeyDownWS);
            mouseUp();
            window.removeEventListener("mouseup", handleMouseUp);
        };
        
        window.addEventListener("mouseup", handleMouseUp);
      }}
    >
      <motion.div
        className="grid pointer-events-none"
        animate={{ rotateY: flip, rotateZ: rotate, origin: 0.5 }}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onPointerDown: (e) => {
              setMouseIsDown(true);
              controls.start(e);
              selectedObject ? setSelectedObject(null) : null;
              dispatchEvent(new CustomEvent("objectMoved"));
            },
            onDoubleClick: () => {
              selectedObject ? setSelectedObject(null) : setSelectedObject(scope.current);
            },
            style: {
              ...child.props.style,
              pointerEvents: "auto",
              border: selectedObject === scope.current ? "2px solid white" : null,
            },
          })
        )}
      </motion.div>
      {selectedObject === scope.current && (
        <div className="flex gap-4 absolute pt-4 top-full pointer-events-auto">
          <div className="bg-gray-700 p-2 rounded-full" onClick={() => rotateObject(flip == 180)}>
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
          <div className="bg-gray-700 p-2 rounded-full" onClick={() => rotateObject(flip == 180)}>
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
