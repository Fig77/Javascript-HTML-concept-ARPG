import 'phaser';
import config from '../Config/config';
import unit from '../Objects/Unit';
import character from '../Objects/character';
import gladiator from '../Objects/gladiator';
import statsUi from '../Objects/statManager';
import sceneAnimations from './SceneHelper';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {
    // Loading a few things here that will be constant irrelevant to the state of the scene.
    // therefore will not be created again on restart.
    this.mapInit(); // initialize map, camera and collider.
  }

  mapInit() { //EVERYTHING HERE THAT DOES NOT HAVE A THIS CAN OR MAY BE CREATED ON STATIC PRELOADER
    this.arena = this.make.tilemap({
      key: 'arena'
    });
    const terrain = this.arena.addTilesetImage("Dungeon_Tileset", "layout");
    const bot = this.arena.createStaticLayer("Tile Layer 1", terrain, 0, 0);
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
    wall.setTileIndexCallback(24, () => this.startGame());
    this.walls = [wall, overwall];
    this.match = false
  }

  addEnemies() {
    let i = 0;
    let gladiador = null;
    while (i < this.score / 10) {
      gladiador = new gladiator(this, this.arena.widthInPixels / 2 + (25 * i + 1), 125);
      gladiador.getSprite().setCollideWorldBounds(true);
      this.physics.add.collider(gladiador.getSprite(), this.walls[0]);
      this.physics.add.collider(gladiador.getSprite(), this.player.getSprite());
      this.enemyGroup[i] = gladiador;
      this.enemyCounter += 1;
      i += 1;
    }
  };

  startGame() {
    if (!this.match) {
      this.player.unit.y -= 125;
      this.match = true;
      this.addEnemies();
    }
  };

  getOrtogonalDistance(attack, attacker) {
    let x = (attack.unit.x - attacker.unit.x);
    let y = (attack.unit.y - attacker.unit.y);
    return {
      x,
      y
    };
  };

  playerInit() {
    this.player = new character(this, this.arena.widthInPixels / 2, this.arena.heightInPixels - 25);
    this.player.setCamera();
    this.player.getSprite().setCollideWorldBounds(true);
    this.physics.add.collider(this.player.getSprite(), this.walls[0]);
  };

  statBoxManager() {
    if (this.stat && !this.match) {
      this.statmanager.destroyMe();
      this.stat = false;
    } else {
      this.statmanager.initManager();
      this.stat = true;
    }
  };

  create() {
    this.score = 10;
    this.match = false;
    this.stat = false;
    this.playerTarget = null;
    this.playerInit(); // initialize player
    this.enemyGroup = new Array(3); // Empty array of enemies.
    //Ui Setups
    this.statmanager = new statsUi(this);
    this.enemyCounter = 0;
    // Scene input managment
    this.input.keyboard.on('keydown_SPACE', () => {
      this.statBoxManager();
    });
  };

  matchLoop() {
    let tempEnemy = null;
    let tempUpdate = null;
    let i = 0;
    while (i < 3) {
      if (this.enemyCounter <= 0) {
        this.levelUp();
      }
      tempEnemy = this.enemyGroup[i];
      if (tempEnemy === null || tempEnemy === undefined) {

      } else {
        tempUpdate = this.enemyGroup[i].update();
        if (tempUpdate === -5) {
          this.player.pendingStat += 5;
          this.enemyCounter -= 1;
          this.score += 10;
          tempEnemy.destroy();
          tempEnemy = null;
        }
      }
      i += 1;
    }
  }

  levelUp() {
    this.match = false;
    this.player.unit.x = this.arena.widthInPixels / 2;
    this.player.unit.y = this.arena.heightInPixels - 25;
  }


  update() {
    if (this.stat !== -5) {
      this.stat = this.player.update();
    } else {
      this.player.destroy();
    }
    if (this.match) {
      this.matchLoop();
    }
  }

};

// On player defeat show game over screen <--
// Pause screen and switch to game over <-- done
// get gane over layout.
// player sprite
// player stats
// add go to menu and restart normally