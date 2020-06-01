import 'phaser';
import config from '../Config/config';
import character from '../Objects/character';

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
    this.player = new character(this);
    this.cameras.main.setBounds(0, 0, 1600, 1600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
  }

  update() {
    this.cameras.main.setBounds(0, 0, 1600, 1600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
    this.player.update();
  };
};