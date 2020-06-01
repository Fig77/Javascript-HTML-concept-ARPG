import 'phaser';
import config from '../Config/config';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {}

  create() {
    let dungeon = this.add.tilemap('dungeon');
    let terrain = dungeon.addTilesetImage("Dungeon_Tileset", "layout");
    let bot = dungeon.createStaticLayer("Tile Layer 1", terrain, 0, 0);
    let wall = dungeon.createStaticLayer("wall", terrain, 0, 0);
    let hwal = dungeon.createStaticLayer("hardwal", terrain, 0, 0);
    this.player = this.physics.add.sprite(50, 100, 'adventurer', 6);
  }

  update() {

  };
};
