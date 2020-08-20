/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
import Character from '../Objects/character';
import Gladiator from '../Objects/gladiator';
import StatsUi from '../Objects/statManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

   preload() {


    
  }

  mapInit() {
    this.arena = this.make.tilemap({
      key: 'arena',
    });
    const terrain = this.arena.addTilesetImage('Dungeon_Tileset', 'layout');
    this.arena.createStaticLayer('Tile Layer 1', terrain, 0, 0);
    this.arena.createStaticLayer('stepp', terrain, 0, 0);
    const wall = this.arena.createStaticLayer('wall', terrain, 0, 0);
    const overwall = this.arena.createStaticLayer('overwall', terrain, 0, 0);

    // scenecamera
    this.cameras.main.setBounds(0, 0, this.arena.widthInPixels, this.arena.heightInPixels);
    this.cameras.main.zoom = 1.2;

    // colider
    wall.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = this.arena.widthInPixels;
    this.physics.world.bounds.height = this.arena.heightInPixels;
    this.physics.world.enable(this);
    wall.setTileIndexCallback(24, () => this.startGame());
    this.walls = [wall, overwall];
    this.match = false;
  }

  // eslint-disable-next-line class-methods-use-this
  getOrtogonalDistance(attack, attacker) {
    const x = (attack.unit.x - attacker.unit.x);
    const y = (attack.unit.y - attacker.unit.y);
    return {
      x,
      y,
    };
  }

  playerInit() {
    this.player = new Character(this, this.arena.widthInPixels / 2, this.arena.heightInPixels - 25);
    this.player.setCamera();
    this.player.getSprite().setCollideWorldBounds(true);
    this.physics.add.collider(this.player.getSprite(), this.walls[0]);
  }

  addEnemies() {
    let i = 0;
    let gladiador = null;
    this.enemyCounter = 0;
    while (i < this.currentNumber) {
      gladiador = new Gladiator(this, this.arena.widthInPixels / 2 + (25 * i + 1), 125);
      gladiador.getSprite().setCollideWorldBounds(true);
      gladiador.updateStats(this.score);
      this.physics.add.collider(gladiador.getSprite(), this.walls[0]);
      this.physics.add.collider(gladiador.getSprite(), this.player.getSprite());
      this.enemyGroup[i] = gladiador;
      this.enemyCounter += 1;
      i += 1;
    }
    if (i === 2) {
      this.physics.add.collider(this.enemyGroup[0].getSprite(), this.enemyGroup[1].getSprite());
    }
    if (i === 3) {
      this.physics.add.collider(this.enemyGroup[0].getSprite(), this.enemyGroup[1].getSprite());
      this.physics.add.collider(this.enemyGroup[0].getSprite(), this.enemyGroup[2].getSprite());
      this.physics.add.collider(this.enemyGroup[1].getSprite(), this.enemyGroup[2].getSprite());
    }
  }

  statBoxManager() {
    if (this.stat) {
      this.statmanager.destroyMe();
      this.stat = false;
    } else if (!this.stat && !this.match) {
      this.statmanager.initManager();
      this.stat = true;
    }
  }

  create() {
    this.mapInit();
    this.input.keyboard.on('keydown_SPACE', () => {
      this.statBoxManager();
    });
    this.score = 10;
    this.round = 1;
    this.match = false;
    this.stat = false;
    this.playerTarget = null;
    this.maxEnemies = 3;
    this.currentNumber = 1;
    this.playerInit(); // initialize player
    this.enemyGroup = new Array(3); // Empty array of enemies.
    // Ui Setups
    this.statmanager = new StatsUi(this);
    this.enemyCounter = 1;
    this.statmanager.drawIngameUi();
  }

  startGame() {
    if (!this.match) {
      this.player.unit.y -= 125;
      this.match = true;
      this.addEnemies();
      this.statBoxManager();
    }
  }

  matchLoop() {
    let tempEnemy = null;
    let tempUpdate = null;
    let i = 0;
    while (i < this.maxEnemies) {
      if (this.enemyCounter <= 0) {
        this.levelUp();
        break;
      }
      tempEnemy = this.enemyGroup[i];
      if (tempEnemy === null || tempEnemy === undefined) {
        '';
      } else {
        tempUpdate = this.enemyGroup[i].update();
        if (tempUpdate === -5) {
          this.player.pendingStat += 5;
          this.enemyCounter -= 1;
          this.score += 10;
          tempEnemy.destroy();
          tempEnemy.unit.destroy();
          this.enemyGroup[i] = null;
        }
      }
      i += 1;
    }
  }

  levelUp() {
    this.match = false;
    this.player.unit.x = this.arena.widthInPixels / 2;
    this.player.unit.y = this.arena.heightInPixels - 25;
    this.currentNumber += 1;
    if (this.currentNumber >= this.maxEnemies + 1) {
      this.currentNumber = 1;
    }
    this.round += 1;
  }

  update() {
    if (this.status !== -5) {
      this.status = this.player.update();
      this.statmanager.update();
    } else {
      this.scene.start('GameOver', {
        score: this.score,
        player: this.player,
      });
      this.resetGame();
    }
    if (this.match) {
      this.matchLoop();
    }
  }

  resetGame() {
    this.player.destroy();
    let i = 0;
    while (i < this.enemyGroup[i]) {
      this.enemyGroup[i].destroy();
      i += 1;
    }
    this.status = 0;
    this.create();
  }
}