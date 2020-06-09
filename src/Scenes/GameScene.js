import 'phaser';
import config from '../Config/config';
import unit from '../Objects/Unit';
import character from '../Objects/character';
import gladiator from '../Objects/gladiator';

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


  // Even thought this popup can also be on another scene, figured was better for this example to leave it here.

  statBoxInit() {
    this.box = this.add.image(this.arena.widthInPixels - 165, this.arena.heightInPixels - 130, 'statbox');
    //this.closeMe = this.add.image(this.box.x + 70, this.box.y - 100, 'close'); not really necessary since using spacebar.
    this.button1 = this.add.image(this.box.x + 35, this.box.y - 100, 'arrow').setInteractive();
    this.button2 = this.add.image(this.box.x + 35, this.box.y - 60, 'arrow');
    this.button3 = this.add.image(this.box.x + 35, this.box.y - 20, 'arrow');
    this.button4 = this.add.image(this.box.x + 35, this.box.y + 20, 'arrow');
    this.button1.on('pointerdown', () => {
      console.log('uno pressed');
    });
    this.button1.on('pointerdown', () => {
      console.log('uno pressed');
    });
    this.button1.on('pointerdown', () => {
      console.log('uno pressed');
    });
        this.button1.on('pointerdown', () => {
      console.log('uno pressed');
    });
  };

  statBoxManager() {
    if (this.stat) {
      // destroy
      this.box.destroy();
      this.button1.destroy();
      this.button2.destroy();
      this.button3.destroy();
      this.button4.destroy();
      this.stat = false;
    } else {
      this.statBoxInit();
      this.stat = true;
    }
  };

  create() {
    this.stat = false;
    this.mapInit(); //initialize map, camera and collider
    this.playerInit(); //initialize player
    //Ui Setups
    this.input.keyboard.on('keydown_SPACE', () => {
      this.statBoxManager();
    });
    //this.add.image(0, 0, 'box').setOrigin(0);
  };

  update() {
    if (!this.stat) {
      this.player.update();
      //this.gladi.update();
    }
  };
};