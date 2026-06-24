// CharacterHomeScene.ts
import Phaser from "phaser";

export class CharacterHomeScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  private lastDirection: "down" | "up" | "left" | "right" = "up";

  constructor() {
    super("CharacterHomeScene");
  }

  create(data: { exitX?: number; exitY?: number } = {}) {
    const map = this.make.tilemap({ key: "character-home-map" });

    const interiors1 = map.addTilesetImage("Interiors 1", "tileset-interiors-1");
    const rooms = map.addTilesetImage("Rooms", "tileset-rooms");
    const buildings1 = map.addTilesetImage("Buildings 1", "tileset-buildings-1");
    const props1 = map.addTilesetImage("Props 1", "tileset-props-1");
    const water = map.addTilesetImage("Water", "tileset-water");
    const buildings6 = map.addTilesetImage("Buildings 6", "tileset-buildings-6");
    const terrain = map.addTilesetImage("Terrain", "tileset-terrain");
    const bridges = map.addTilesetImage("Bridges", "tileset-bridges");
    const boats = map.addTilesetImage("Boats", "tileset-boats");
    const trees = map.addTilesetImage("Trees", "tileset-trees");
    const cities = map.addTilesetImage("Cities", "tileset-cities");
    const buildings2 = map.addTilesetImage("Buildings 2", "tileset-buildings-2");
    const props2 = map.addTilesetImage("Props 2", "tileset-props-2");
    const buildings3 = map.addTilesetImage("Buildings 3", "tileset-buildings-3");
    const interiors2 = map.addTilesetImage("Interiors 2", "tileset-interiors-2");
    const buildings4 = map.addTilesetImage("Buildings 4", "tileset-buildings-4");
    const buildings5 = map.addTilesetImage("Buildings 5", "tileset-buildings-5");
    const buildings7 = map.addTilesetImage("Buildings 7", "tileset-buildings-7");
    const buildings8 = map.addTilesetImage("Buildings 8", "tileset-buildings-8");
    const interiors3 = map.addTilesetImage("Interiors 3", "tileset-interiors-3");
    const forge = map.addTilesetImage("Forge", "tileset-forge");
    const smoke = map.addTilesetImage("Smoke", "tileset-smoke");
    const npcSeller = map.addTilesetImage("NPC Seller", "npc-seller");
    const npcCitizen1 = map.addTilesetImage("NPC Citizen 1", "npc-citizen-1");

    const tilesets = [interiors1, rooms, buildings1, props1, water, buildings6, terrain, bridges, boats, trees, cities, buildings2, props2, buildings3, interiors2, buildings4, buildings5, buildings7, buildings8, interiors3, forge, smoke, npcSeller, npcCitizen1].filter((t): t is Phaser.Tilemaps.Tileset => t !== null);

    // Create all tile layers from Tiled
    map.layers.forEach((layerData) => {
      const layer = map.createLayer(layerData.name, tilesets, 0, 0);

      if (!layer) {
        console.warn(`Could not create layer: ${layerData.name}`);
        return;
      }

      if (layerData.name.startsWith("Foreground")) {
        layer.setDepth(10);
      } else {
        layer.setDepth(0);
      }
    });

    this.createPlayerAnimations();
    this.createPlayer(55, 210);
    this.createObjectsCollision(map);
    this.createExitFromObject(map, data?.exitX || 1135, data?.exitY || 2000);
    this.cameras.main.setZoom(2);
    this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.wasd = this.input.keyboard!.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    }) as {
      W: Phaser.Input.Keyboard.Key;
      A: Phaser.Input.Keyboard.Key;
      S: Phaser.Input.Keyboard.Key;
      D: Phaser.Input.Keyboard.Key;
    };

    this.cameras.main.fadeIn(500);
  }

  update() {
    const speed = 100;

    this.player.setVelocity(0);

    const left = this.cursors.left?.isDown || this.wasd.A.isDown;
    const right = this.cursors.right?.isDown || this.wasd.D.isDown;
    const up = this.cursors.up?.isDown || this.wasd.W.isDown;
    const down = this.cursors.down?.isDown || this.wasd.S.isDown;

    let isMoving = false;

    if (left) {
      this.player.setVelocityX(-speed);
      this.lastDirection = "left";
      isMoving = true;
    } else if (right) {
      this.player.setVelocityX(speed);
      this.lastDirection = "right";
      isMoving = true;
    }

    if (up) {
      this.player.setVelocityY(-speed);
      this.lastDirection = "up";
      isMoving = true;
    } else if (down) {
      this.player.setVelocityY(speed);
      this.lastDirection = "down";
      isMoving = true;
    }

    this.player.body?.velocity.normalize().scale(speed);

    if (isMoving) {
      this.player.anims.play(`player-walk-${this.lastDirection}`, true);
    } else {
      this.player.anims.stop();
      this.setIdleFrame();
    }
  }

  private createPlayer(spawnX: number, spawnY: number) {
    this.player = this.physics.add.sprite(spawnX, spawnY, "player", 0);
    this.player.setDepth(5);
    this.player.setCollideWorldBounds(true);
    this.player.body?.setSize(16, 20);
    this.player.body?.setOffset(16, 20);
  }

  private createPlayerAnimations() {
    const columns = 6;

    const rowFrames = (rowNumber: number) => {
      const start = rowNumber * columns;
      return [start, start + 1, start + 2, start + 3, start + 4, start + 5];
    };

    this.anims.create({
      key: "player-walk-down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: rowFrames(0)
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "player-walk-up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: rowFrames(2)
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "player-walk-right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: rowFrames(3)
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "player-walk-left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: rowFrames(4)
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  private setIdleFrame() {
    if (this.lastDirection === "down") {
      this.player.setFrame(0);
    }

    if (this.lastDirection === "up") {
      this.player.setFrame(12);
    }

    if (this.lastDirection === "right") {
      this.player.setFrame(18);
    }

    if (this.lastDirection === "left") {
      this.player.setFrame(24);
    }
  }

  private createObjectsCollision(map: Phaser.Tilemaps.Tilemap) {
    const objectLayer = map.getObjectLayer("Objects");

    if (!objectLayer) {
      console.warn("Could not find object layer: Objects");
      return;
    }

    const collisionGroup = this.physics.add.staticGroup();

    objectLayer.objects.forEach((object) => {
      if (
        object.x === undefined ||
        object.y === undefined ||
        object.width === undefined ||
        object.height === undefined
      ) {
        return;
      }

      const collider = this.add.zone(
        object.x + object.width / 2,
        object.y + object.height / 2,
        object.width,
        object.height
      );

      this.physics.add.existing(collider, true);
      collisionGroup.add(collider);
    });

    this.physics.add.collider(this.player, collisionGroup);
  }

  private createExitFromObject(map: Phaser.Tilemaps.Tilemap, exitX: number, exitY: number) {
    const exitLayer = map.getObjectLayer("Exit");

    if (!exitLayer) {
      console.warn("Could not find exit object layer");
      return;
    }

    let hasExited = false;

    exitLayer.objects.forEach((object) => {
      if (
        object.x === undefined ||
        object.y === undefined ||
        object.width === undefined ||
        object.height === undefined
      ) {
        return;
      }

      const exitZone = this.add.zone(
        object.x + object.width / 2,
        object.y + object.height / 2,
        object.width,
        object.height
      );

      this.physics.add.existing(exitZone, true);

      this.physics.add.overlap(this.player, exitZone, () => {
        if (!hasExited) {
          hasExited = true;
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.time.delayedCall(500, () => {
            this.scene.start("WorldScene", { playerX: exitX, playerY: exitY });
          });
        }
      }, undefined, this);
    });
  }
}