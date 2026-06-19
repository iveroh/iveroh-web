import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  private lastDirection: "down" | "up" | "left" | "right" = "down";

  constructor() {
    super("WorldScene");
  }

  create() {
    const map = this.make.tilemap({ key: "portfolio-map" });

    const grass = map.addTilesetImage("A Tileset Grass", "tileset-grass");
    const wall = map.addTilesetImage("TX Tileset Wall", "tileset-wall");
    const props = map.addTilesetImage("TX Props", "tileset-props");
    const stoneGround = map.addTilesetImage(
      "TX Tileset Stone Ground",
      "tileset-stone-ground"
    );
    const structures = map.addTilesetImage("TX Struct", "tileset-structures");
    const water = map.addTilesetImage("A Farm building", "tileset-farm");
    const buildings = map.addTilesetImage("Buildings", "tileset-buildings");
    const objects = map.addTilesetImage("A Tileset_Water", "tileset-beaches");
    const farmTerrain = map.addTilesetImage("A Farm terrain", "tileset-waterfall");
    const rooms = map.addTilesetImage("Rooms", "tileset-rooms");
    const interiors = map.addTilesetImage("Interiors_free_16x16", "tileset-interiors");
    const boats = map.addTilesetImage("boats", "tileset-boats");
    const bridges = map.addTilesetImage("Bridges", "tileset-bridges");
    const trees = map.addTilesetImage("Trees", "tileset-trees");
    const cityBuildings = map.addTilesetImage("City building", "tileset-city-buildings");
    const props2 = map.addTilesetImage("Props", "tileset-props-2");

    if (!grass || !wall || !props || !stoneGround || !structures || !water || !buildings || !objects || !farmTerrain || !rooms || !interiors || !boats || !bridges || !trees || !cityBuildings || !props2) {
      throw new Error(
        "One or more tilesets failed to load. Check your Tiled tileset names and Phaser preload keys."
      );
    }

    const tilesets = [grass, wall, props, stoneGround, structures, water, buildings, objects, farmTerrain, rooms, interiors, boats, bridges, trees, cityBuildings, props2];

    // Create all tile layers from Tiled automatically.
    map.layers.forEach((layerData) => {
      const layer = map.createLayer(layerData.name, tilesets, 0, 0);

      if (!layer) {
        console.warn(`Could not create layer: ${layerData.name}`);
        return;
      }

      // Layers that should visually cover the player.
      if (
        layerData.name.startsWith("Foreground/")
      ) {
        layer.setDepth(10);
      } else {
        layer.setDepth(0);
      }
    });

    this.createPlayerAnimations();
    this.createPlayer();
    this.createCollisionFromObjectLayer(map);

    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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
  }

  update() {
    const speed = 140;

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

  private createPlayer() {

    this.player = this.physics.add.sprite(1135, 2000, "player", 0);

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

  private createCollisionFromObjectLayer(map: Phaser.Tilemaps.Tilemap) {
    const objectLayer = map.getObjectLayer("Spawn area");

    if (!objectLayer) {
      console.warn("Could not find object layer: Object Layer 1");
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
}