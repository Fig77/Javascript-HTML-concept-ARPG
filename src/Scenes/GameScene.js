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
    const bot = dungeon.createStaticLayer("Tile Layer 1", terrain, 0, 0);
    const wall = dungeon.createStaticLayer("wall", terrain, 0, 0);
    const hwal = dungeon.createStaticLayer("hardwal", terrain, 0, 0);
    this.player = new character(this);
    this.physics.world.bounds.width = dungeon.widthInPixels;
    this.physics.world.bounds.height = dungeon.heightInPixels;
    this.cameras.main.setBounds(0, 0, dungeon.widthInPixels, dungeon.heightInPixels);
    this.cameras.main.zoom = 2;
  }

  update() {
    this.player.update();
  };
};