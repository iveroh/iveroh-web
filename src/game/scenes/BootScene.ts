import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.tilemapTiledJSON("portfolio-map", "/maps/map.json");

    this.load.image("tileset-grass", "/tilesets/Tileset-Grass.png");
    this.load.image("tileset-wall", "/tilesets/Tileset-Wall.png");
    this.load.image("tileset-props", "/tilesets/Props.png");
    this.load.image("tileset-stone-ground", "/tilesets/Tileset-Stone-Ground.png");
    this.load.image("tileset-structures", "/tilesets/Structures.png");

    // Load player sprite sheet with frame dimensions (48x48 pixels per frame)
    this.load.spritesheet("player", "/sprites/player.png", {
      frameWidth: 48,
      frameHeight: 48
    });
  }

  create() {
    this.scene.start("WorldScene");
  }
}