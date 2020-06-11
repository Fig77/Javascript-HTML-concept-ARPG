import 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x = 50, y = 100, hp = 100, atk = 10, def = 0, mod_hp = 0, mod_atk = 0, mod_def = 0, spritekey = '') {
    super(scene);
    // position
    this.x = x;
    this.y = y;
    // base stats
    this.hp = hp;
    this.currentHp = hp;
    this.atk = atk;
    this.def = def;
    this.speed = 70;
    // modifiers
    this.mod_hp = mod_hp;
    this.mod_atk = mod_atk;
    this.mod_def = mod_def;
    // sprite
    this.unit = scene.physics.add.sprite(x, y, spritekey);
    this.unit.body.setSize(this.unit.width, this.unit.height, true);
    this.flipped = false;
    this.walking = false;
    this.dire = 1;
  };

  stop() {
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
  }

  flipHorizontal(flip) {
    if (flip !== null) {
      if (!flip) {
        this.unit.body.offset.x = 0;
      } else {
        this.unit.body.offset.x = this.unit.width;
      }
      this.flipped = flip;
    }
  };

  attackUnit(enemy, mod = 0) {
    enemy.currentHp -= this.atk + mod;
  };

  setSpriteKey(key) {
    //this.unit.scene.physics.add.sprite(this.x, this.y, key);
  }

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.unit.setVelocityY(y);
    this.unit.setVelocityX(x);
    this.unit.setScale(sx, sy);
    this.flipHorizontal(flip);
  };

  getSprite() {
    return this.unit;
  }

  toggleDead() {
    if (this.currentHp <= 0) {
      this.destroy();
    }
  };

  update() {
    this.toggleDead();
  };
};