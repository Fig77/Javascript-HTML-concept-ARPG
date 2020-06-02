import 'phaser';
import config from '../Config/config';
import character from '../Objects/character';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {}

  create() {
    const dungeon = this.add.tilemap('dungeon');
    const terrain = dungeon.addTilesetImage("Dungeon_Tileset", "layout");
    const bot = dungeon.createStaticLayer("Tile Layer 1", terrain, 0, 0).setDepth(-1);
    const wall = dungeon.createStaticLayer("wall", terrain, 0, 0);
    const hwal = dungeon.createStaticLayer("hardwal", terrain, 0, 0);
    this.player = new character(this);
    this.physics.world.bounds.width = dungeon.widthInPixels;
    this.physics.world.bounds.height = dungeon.heightInPixels;
    this.cameras.main.setBounds(0, 0, dungeon.widthInPixels, dungeon.heightInPixels);
    this.cameras.main.zoom = 2;
    this.player.setCamera();
    // colider
    wall.setCollisionByExclusion(0,{collides: true});
    hwal.setCollisionByExclusion(0,{collides: true});
    this.physics.add.collider(this.player, wall);
    this.physics.world.collide(this.player, wall);
    this.physics.add.collider(this.player, hwal);
  }

  update() {
    this.player.update();
  };
};