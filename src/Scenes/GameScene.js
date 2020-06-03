import 'phaser';
import config from '../Config/config';
import character from '../Objects/character';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {}
  create() {
    // Map Init <- module this
    const dungeon = this.make.tilemap({
      key: 'dungeon'
    });
    const terrain = dungeon.addTilesetImage('Dungeon_Tileset', 'layout');
    //const terrain = dungeon.addTilesetImage("Dungeon_Tileset", "layout");
    const bot = dungeon.createStaticLayer("Tile Layer 1", terrain, 0, 0).setDepth(-1);
    const step = dungeon.createStaticLayer("stepable", terrain, 0, 0);
    const wall = dungeon.createStaticLayer("wall", terrain, 0, 0);
    const door = dungeon.createStaticLayer("door", terrain, 0, 0);

    //scenecamera
    this.cameras.main.setBounds(0, 0, dungeon.widthInPixels, dungeon.heightInPixels);
    this.cameras.main.zoom = 2;
    // colider 
    wall.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = dungeon.widthInPixels;
    this.physics.world.bounds.height = dungeon.heightInPixels;
    this.physics.world.enable(this);
    // Player init
    this.player = new character(this);
    this.player.setCamera();
    this.physics.add.collider(this.player.getSprite(), wall);
    this.player.getSprite().setCollideWorldBounds(true);
  };

  update() {
    this.player.update();
  };
};