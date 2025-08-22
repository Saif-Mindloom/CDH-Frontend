import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./index.css"; // This imports your CSS file

// Update the interface to include the callback
export interface SlotMachineRef {
  spin: () => void;
  isSpinning: boolean;
}

// Add props interface for the callback
interface SlotMachineProps {
  onSpinComplete?: (result: "won" | "lost" | "halfoff") => void;
}

const SlotMachine = forwardRef<SlotMachineRef, SlotMachineProps>(
  ({ onSpinComplete }, ref) => {
    // Define symbol images - you can replace these paths with your actual image paths
    const symbolImages = [
      "src/assets/FoodImages/CDH-Burger.webp",
      "src/assets/FoodImages/CDH-Pizza.webp",
      "src/assets/FoodImages/CDH-Drink.webp",
      "src/assets/FoodImages/CDH-Meal.webp",
      "src/assets/FoodImages/CDH-pasta.webp",
      "src/assets/FoodImages/CDH-Burger.webp",
    ];
    const [isSpinning, setIsSpinning] = useState(false);

    // Refs for DOM elements
    const reel1Ref = useRef<HTMLDivElement>(null);
    const reel2Ref = useRef<HTMLDivElement>(null);
    const reel3Ref = useRef<HTMLDivElement>(null);
    const symbolStrip1Ref = useRef<HTMLDivElement>(null);
    const symbolStrip2Ref = useRef<HTMLDivElement>(null);
    const symbolStrip3Ref = useRef<HTMLDivElement>(null);

    const reelsRef = useRef([reel1Ref, reel2Ref, reel3Ref]);
    const symbolStripsRef = useRef([
      symbolStrip1Ref,
      symbolStrip2Ref,
      symbolStrip3Ref,
    ]);
    const spinIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

    // Function to get current symbol height based on breakpoints
    const getSymbolHeight = (): number => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );

      if (vw < 768) {
        return 104; // Phone: 104px reel = 104px symbol height (new mobile size)
      } else if (vw < 1024) {
        return 180; // Tablet: 180px reel = 180px symbol height
      } else {
        return 240; // Desktop: 240px reel = 240px symbol height
      }
    };

    useEffect(() => {
      // Initialize reels
      symbolStripsRef.current.forEach((stripRef) => {
        if (stripRef.current) {
          stripRef.current.style.transform = "translateY(0)";
        }
      });
    }, []);

    const sleep = (ms: number): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // Update the snapToSymbol function with responsive height
    const snapToSymbol = (reelIndex: number) => {
      const symbolStrip = symbolStripsRef.current[reelIndex].current;
      if (!symbolStrip) return;

      const symbolHeight = getSymbolHeight();
      const finalSymbolIndex = Math.floor(Math.random() * 6);
      const finalPosition = finalSymbolIndex * symbolHeight;

      symbolStrip.style.transition = "transform 0.5s ease-out";
      symbolStrip.style.transform = `translateY(-${finalPosition}px)`;

      setTimeout(() => {
        symbolStrip.style.transition = "none";
      }, 500);
    };

    // Function to determine spin result based on final positions
    const determineSpinResult = (): "won" | "lost" | "halfoff" => {
      // You can implement your own logic here
      // For now, using random logic as an example
      const random = Math.random();

      if (random < 0.15) {
        return "won"; // 15% chance to win
      } else if (random < 0.35) {
        return "halfoff"; // 20% chance for half off
      } else {
        return "lost"; // 65% chance to lose
      }
    };

    const triggerResultAnimation = () => {
      const random = Math.random();

      if (random < 0.15) {
        // Jackpot animation
        reelsRef.current.forEach((reelRef) => {
          reelRef.current?.classList.add("jackpot");
        });
        setTimeout(() => {
          reelsRef.current.forEach((reelRef) => {
            reelRef.current?.classList.remove("jackpot");
          });
        }, 1000);
      } else if (random < 0.35) {
        // Partial win animation
        reelsRef.current.forEach((reelRef) => {
          reelRef.current?.classList.add("partial-win");
        });
        setTimeout(() => {
          reelsRef.current.forEach((reelRef) => {
            reelRef.current?.classList.remove("partial-win");
          });
        }, 800);
      } else {
        // No win animation
        reelsRef.current.forEach((reelRef) => {
          reelRef.current?.classList.add("no-win");
        });
        setTimeout(() => {
          reelsRef.current.forEach((reelRef) => {
            reelRef.current?.classList.remove("no-win");
          });
        }, 500);
      }
    };

    // Update the spin function to include the callback
    const spin = async () => {
      setIsSpinning(true);

      // Clear any existing intervals
      spinIntervalsRef.current.forEach((interval) => clearInterval(interval));
      spinIntervalsRef.current = [];

      // Start spinning reels with different speeds
      reelsRef.current.forEach((reelRef, index) => {
        const reel = reelRef.current;
        const symbolStrip = symbolStripsRef.current[index].current;

        if (!reel || !symbolStrip) return;

        reel.classList.add("spinning");

        let position = 0;
        const speed = 30 + index * 6;

        const interval = setInterval(() => {
          position += speed;
          symbolStrip.style.transform = `translateY(-${position}px)`;
        }, 50);

        spinIntervalsRef.current.push(interval);
      });

      // Spin for 3 seconds
      await sleep(3000);

      // Stop spinning with staggered delay
      for (let i = 0; i < reelsRef.current.length; i++) {
        await sleep(400);

        clearInterval(spinIntervalsRef.current[i]);
        reelsRef.current[i].current?.classList.remove("spinning");

        // Snap to final symbol position
        snapToSymbol(i);
      }

      setIsSpinning(false);

      // Trigger result animation
      triggerResultAnimation();

      // Determine the result and notify parent after a short delay to let animations finish
      setTimeout(() => {
        const result = determineSpinResult();
        onSpinComplete?.(result);
      }, 1200); // Wait for result animations to complete
    };

    // Cleanup intervals on unmount
    useEffect(() => {
      return () => {
        spinIntervalsRef.current.forEach((interval) => clearInterval(interval));
      };
    }, []);

    useImperativeHandle(ref, () => ({
      spin,
      isSpinning,
    }));

    return (
      <div className="slot-machine">
        <img
          src="src/assets/SlotMachine.png"
          alt="Cafe Delhi Heights"
          // className="slot-logo"
          style={{
            width: "110%",
            height: "110%",
            position: "absolute",
            top: "-8.5px",
          }}
        />
        <img
          src="src/assets/SlotArrows.png"
          alt="Cafe Delhi Heights"
          // className="slot-logo"
          style={{
            width: "92%",
            // height: "110%",
            position: "absolute",
            // top: "-8.5px",
            zIndex: 1,
          }}
        />
        <div className="slot-reels">
          <div className="reel-left" ref={reel1Ref}>
            <div className="reel-container">
              <div className="symbol-strip" ref={symbolStrip1Ref}>
                <div className="symbol">
                  <img
                    src={symbolImages[0]}
                    alt="Burger"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[1]}
                    alt="Fries"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[2]}
                    alt="Drink"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[3]}
                    alt="Hotdog"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[4]}
                    alt="Pizza"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[5]}
                    alt="Taco"
                    className="symbol-image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="reel" ref={reel2Ref}>
            <div className="reel-container">
              <div className="symbol-strip" ref={symbolStrip2Ref}>
                <div className="symbol">
                  <img
                    src={symbolImages[1]}
                    alt="Fries"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[2]}
                    alt="Drink"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[3]}
                    alt="Hotdog"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[4]}
                    alt="Pizza"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[5]}
                    alt="Taco"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[0]}
                    alt="Burger"
                    className="symbol-image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="reel-right" ref={reel3Ref}>
            <div className="reel-container">
              <div className="symbol-strip" ref={symbolStrip3Ref}>
                <div className="symbol">
                  <img
                    src={symbolImages[2]}
                    alt="Drink"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[3]}
                    alt="Hotdog"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[4]}
                    alt="Pizza"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[5]}
                    alt="Taco"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[0]}
                    alt="Burger"
                    className="symbol-image"
                  />
                </div>
                <div className="symbol">
                  <img
                    src={symbolImages[1]}
                    alt="Fries"
                    className="symbol-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <button className="spin-button" onClick={spin} disabled={isSpinning}>
        {isSpinning ? "SPINNING..." : "SPIN!"}
      </button> */}
      </div>
    );
  }
);

SlotMachine.displayName = "SlotMachine";

export default SlotMachine;
