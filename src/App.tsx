import { useEffect, useRef } from "react";
import { createGame } from "./game/PhaserGame";

export default function App() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    gameRef.current = createGame("game-container");

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div id="game-container" style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <p>This website is currently under reconstruction. Please check back later to see the new version!</p>
    </div>
  );
}