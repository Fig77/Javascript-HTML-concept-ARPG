import 'phaser';
import config from '../Config/config';
import unit from '../Objects/Unit';
import character from '../Objects/character';
import gladiator from '../Objects/gladiator';
import statsUi from '../Objects/statManager'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {}

  mapInit() {
    this.arena = this.make.tilemap({
      key: 'arena'
    });
    const terrain = this.arena.addTilesetImage("Dungeon_Tileset", "layout");
    const bot = this.arena.createStaticLayer("Tile Layer 1", terrain, 0, 0).setDepth(-1);
    const step = this.arena.createStaticLayer("stepp", terrain, 0, 0);
    const wall = this.arena.createStaticLayer("wall", terrain, 0, 0);
    const overwall = this.arena.createStaticLayer("overwall", terrain, 0, 0);
    //scenecamera
    this.cameras.main.setBounds(0, 0, this.arena.widthInPixels, this.arena.heightInPixels);
    this.cameras.main.zoom = 1.2;
    // colider 
    wall.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = this.arena.widthInPixels;
    this.physics.world.bounds.height = this.arena.heightInPixels;
    this.physics.world.enable(this);
    //colliders
    this.walls = [wall, overwall];
  }

  playerInit() {
    this.player = new character(this, this.arena.widthInPixels / 2, this.arena.heightInPixels - 25);
    this.player.setCamera();
    this.player.getSprite().setCollideWorldBounds(true);
    this.physics.add.collider(this.player.getSprite(), this.walls[0]);
  };

  statBoxManager() {
    if (this.stat) {
      this.statmanager.destroyMe();
      this.stat = false;
    } else {
      this.statmanager.initManager();
      this.stat = true;
    }
  };

  create() {
    this.stat = false;
    this.mapInit(); //initialize map, camera and collider
    this.playerInit(); //initialize player
    //Ui Setups
    this.statmanager = new statsUi(this);
    // Scene input managment
    this.input.keyboard.on('keydown_SPACE', () => {
      this.statBoxManager();
    });
  };

  update() {
    if (!this.stat) {
      this.player.update();
      //this.gladi.update();
    }
  };
};