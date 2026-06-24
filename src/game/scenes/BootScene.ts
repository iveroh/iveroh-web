import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/maps/spawn_island.json");
    this.load.tilemapTiledJSON("character-home-map", "/maps/character_home.json");

    this.load.image("tileset-boats", "/tilesets/Boats.png");
    this.load.image("tileset-bridges", "/tilesets/Bridges.png");
    this.load.image("tileset-buildings-1", "/tilesets/Buildings-1.png");
    this.load.image("tileset-buildings-2", "/tilesets/Buildings-2.png");
    this.load.image("tileset-buildings-3", "/tilesets/Buildings-3.png");
    this.load.image("tileset-buildings-4", "/tilesets/Buildings-4.png");
    this.load.image("tileset-buildings-5", "/tilesets/Buildings-5.png");
    this.load.image("tileset-buildings-6", "/tilesets/Buildings-6.png");
    this.load.image("tileset-buildings-7", "/tilesets/Buildings-7.png");
    this.load.image("tileset-buildings-8", "/tilesets/Buildings-8.png");
    this.load.image("tileset-cities", "/tilesets/Cities.png");
    this.load.image("tileset-interiors-1", "/tilesets/Interiors-1.png");
    this.load.image("tileset-interiors-2", "/tilesets/Interiors-2.png");
    this.load.image("tileset-interiors-3", "/tilesets/Interiors-3.png");
    this.load.image("tileset-forge", "/tilesets/Forge.png");
    this.load.image("tileset-props-1", "/tilesets/Props-1.png");
    this.load.image("tileset-props-2", "/tilesets/Props-2.png");
    this.load.image("tileset-rooms", "/tilesets/Rooms.png");
    this.load.image("tileset-smoke", "/tilesets/Smoke.png");
    this.load.image("tileset-trees", "/tilesets/Trees.png");
    this.load.image("tileset-terrain", "/tilesets/Terrain.png");
    this.load.image("tileset-water", "/tilesets/Water.png");

    // NPCs
    this.load.image("npc-seller", "/tilesets/NPCs/NPC-Seller.png");
    this.load.image("npc-citizen-1", "/tilesets/NPCs/NPC-Citizen-1.png");






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