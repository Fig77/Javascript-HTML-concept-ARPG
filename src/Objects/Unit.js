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
    this.unit.body.setSize(15, 22, true);
    this.flipped = false; // false facing right
    this.walking = false;
    this.state = 0; // 0 = active, -1 = incapacitate, 1 = attacks
    this.manualBouncingX = 0;
    this.bounceSpeed = 100;
    this.unit.on('animationcomplete', function (anim, frame) { // Cheesy fix for the usual phaser 3 syntax not responding as in documentation.
      this.emit(`animationcomplete_${anim.key}`, anim, frame);
    }, this.unit);
    this.unit.on('animationupdate', function (anim, frame) {
      this.emit(`animationupdate_${anim.key}`, anim, frame);
    }, this.unit);
  }

  initAnimation() {}

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  update() {
    if (this.toggleDead()) {
      return -5;
    }
    switch (this.state) {
      case 0: {
        return this.state;
      }
      case 1: {
        return this.state;
      }
      case -1: {
        if (this.manualBouncingX != 0) {
          this.bounceOnVariable();
          this.manualBouncingX -= 1;
        } else {
          this.setState(0);
        }
        return this.state;
      }
      default:
        return this.state;
    }
  }

  // Moving actions

  flipHorizontal(flip) {
    if (flip !== null) {
      if (!flip) {
        this.unit.body.setSize(17, 22, true);
      } else {
        this.unit.body.offset.x = 22;
      }
      this.flipped = flip;
    }
  }

  fliponTarget(target) {
    if (!this.flipped) {
      if (this.unit.x > target.x) {
        this.movingSprite(0, 0, -1, 1, true);
      }
    } else if (this.unit.x < target.x) {
      this.movingSprite(0, 0, 1, 1, false);
    }
  }

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.unit.setVelocityY(y);
    this.unit.setVelocityX(x);
    this.unit.setScale(sx, sy);
    this.flipHorizontal(flip);
  }

  absolutDistanceR(target) {
    const distance = this.scene.getOrtogonalDistance(this, target);
    const { x } = distance;
    const { y } = distance;
    const xa = Math.abs(Math.round(x));
    const ya = Math.abs(Math.round(y));
    return {
      xa,
      ya,
      x,
      y,
    };
  }

  stop() {
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
  }

  attack(attacks) {
    attacks.setBounce(250 * this.atk / 10);
    attacks.takeDamage(this.atk);
    this.setState(-1);
  }

  takeDamage(d) {
    this.currentHp -= d;
  }

  setBounce(bounce) {
    this.bounceSpeed = bounce * this.bounceHelper(this.flipped);
    this.manualBouncingX = 2;
  }

  bounceOnVariable() {
    this.unit.body.setVelocityX(1 * this.bounceSpeed);
  }

  bounceHelper(dire) {
    if (dire) {
      return 1;
    }
    return -1;
  }

  toggleDead() {
    if (this.currentHp <= 0) {
      return -5;
    }
  }

  getSprite() {
    return this.unit;
  }

  getUnitStats() {
    return {
      hp: this.hp,
      speed: this.speed,
      atk: this.atk,
    };
  }
}