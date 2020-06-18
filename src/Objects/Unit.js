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
    this.unit.body.setSize(17, 22, true);
    this.flipped = false;
    this.walking = false;
    this.state = 0; // 0 = active, -1 = incapacitate, 1 = enraged
    this.manualBouncingX = 0; // I've look for another way but whatever, going manual.
    this.bounceSpeed = 100;
    this.initAnimation();
  };

  initAnimation() {
    this.unit.on('animationcomplete', function (anim, frame) { //Cheesy fix for the usual phaser 3 syntax not responding as in documentation.
      this.emit('animationcomplete_' + anim.key, anim, frame);
    }, this.unit);
  }

  // state manager

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = -1;
  }

  update() {
    this.toggleDead();
    switch (this.state) {
      case 0: {
      }
      case 1: {
      }
      case -1: {
      }
      default: return this.state;
    }
  };

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
  };

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {

    this.unit.setVelocityY(y);
    this.unit.setVelocityX(x);
    this.unit.setScale(sx, sy);
    this.flipHorizontal(flip);
  };

  absolutDistanceR(target) {
    let distance = this.scene.getOrtogonalDistance(this, target)
    let x = distance.x;
    let y = distance.y;
    let xa = Math.abs(Math.round(x))
    let ya = Math.abs(Math.round(y))
    return {
      xa,
      ya,
      x,
      y
    }
  }

  stop() {
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
  }

  // basic attack action

  attack(attacks) {
    attacks.setBounce(250 * this.atk / 10);
    attacks.setState(-1);
    attacks.takeDamage(this.atk); // makes enemy takes damage.
  };

  takeDamage(d) {
    this.currentHp -= d;
  };

  setBounce(bounce) {
    this.bounceSpeed = bounce * this.bounceHelper(this.flipped);
    this.manualBouncingX = 2;
  }

  bounceOnVariable() { // will manually set a speed on x in base of damage, or unless that is for what is used.
    this.unit.body.setVelocityX(1 * this.bounceSpeed);
  };

  bounceHelper(dire) {
    if (dire) {
      return 1;
    } else {
      return -1;
    }
  }
  // death scene
  toggleDead() {
    if (this.currentHp <= 0) {
      this.destroy();
    }
  };

  getSprite() {
    return this.unit;
  };
};
