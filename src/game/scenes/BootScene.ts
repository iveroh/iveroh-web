import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.tilemapTiledJSON("portfolio-map", "/maps/map.json");

    this.load.image("tileset-grass", "/tilesets/Grass.png");
    this.load.image("tileset-wall", "/tilesets/Stone-Wall.png");
    this.load.image("tileset-props", "/tilesets/Props.png");
    this.load.image("tileset-props-2", "/tilesets/Props-2.png");
    this.load.image("tileset-stone-ground", "/tilesets/Stone-Ground.png");
    this.load.image("tileset-structures", "/tilesets/Structures.png");
    this.load.image("tileset-farm", "/tilesets/Farm.png");
    this.load.image("tileset-buildings", "/tilesets/Buildings.png");
    this.load.image("tileset-beaches", "/tilesets/Beaches.png");
    this.load.image("tileset-waterfall", "/tilesets/Waterfall.png");
    this.load.image("tileset-rooms", "/tilesets/Rooms.png");
    this.load.image("tileset-interiors", "/tilesets/Interiors.png");
    this.load.image("tileset-boats", "/tilesets/Boats.png");
    this.load.image("tileset-bridges", "/tilesets/Bridges.png");
    this.load.image("tileset-trees", "/tilesets/Trees.png");
    this.load.image("tileset-city-buildings", "/tilesets/City-building.png");


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