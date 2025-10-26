import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/shared.css";

export function BubbleAnimation() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const colorPairs = [
      { start: "rgba(147, 197, 253, 0.6)", end: "rgba(196, 181, 253, 0.4)" }, 
      { start: "rgba(196, 181, 253, 0.6)", end: "rgba(251, 207, 232, 0.4)" }, 
      { start: "rgba(251, 207, 232, 0.6)", end: "rgba(167, 243, 208, 0.4)" }, 
      { start: "rgba(167, 243, 208, 0.6)", end: "rgba(147, 197, 253, 0.4)" }, 
      { start: "rgba(191, 219, 254, 0.6)", end: "rgba(233, 213, 255, 0.4)" }, 
    ];

    const newBubbles = Array.from({ length: 20 }, (_, i) => {
      const colors = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      let leftPosition;
      if (Math.random() < 0.5) {
        leftPosition = Math.random() * 25;
      } else {
        leftPosition = 75 + Math.random() * 25;
      }
      
      return {
        id: i,
        size: Math.random() * 80 + 30,
        left: leftPosition,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 5,
        colorStart: colors.start,
        colorEnd: colors.end,
      };
    });

    setBubbles(newBubbles);
  }, []);

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -100,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.8) 0%, 
              rgba(255, 255, 255, 0.4) 10%, 
              ${bubble.colorStart} 20%, 
              ${bubble.colorEnd} 70%, 
              rgba(255, 255, 255, 0.2) 100%)`,
            boxShadow: `
              inset -10px -10px 20px rgba(255, 255, 255, 0.5),
              inset 5px 5px 10px rgba(255, 255, 255, 0.3),
              0 8px 20px rgba(0, 0, 0, 0.1)
            `,
            border: "2px solid rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(4px)",
          }}
          animate={{
            y: [-100, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.id) * 30, Math.cos(bubble.id) * 30, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="highlightTop"
            style={{
              top: "15%",
              left: "25%",
              width: "35%",
              height: "35%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
              filter: "blur(3px)",
            }}
          />
          <div
            className="highlightSecondary"
            style={{
              bottom: "20%",
              right: "15%",
              width: "25%",
              height: "25%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="highlightEdge"
            style={{
              background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(255, 255, 255, 0.6) 75%, transparent 100%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
