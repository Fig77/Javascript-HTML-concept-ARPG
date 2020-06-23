/* eslint-disable consistent-return */
import 'phaser';
import Unit from './Unit';

export default class Gladiator extends Unit {
  constructor(scene, x = 1489.0000000000239, y = 100, hp = 200, atk = 5, def = 5, text = 'gladiator') {
    super(scene, x, y, hp, atk, def, text, 4.5);
    this.timer = this.scene.time.addEvent(this.idleConfig);
    this.text = text;
    this.kill = scene.player;
    this.speed = 96;
    this.dire = 1;
    this.unit.body.setBounce(1);
    this.dX = 0;
    this.last = {
      x,
      y,
    };
    this.initAnimation();
    this.pacmanQueue = [this.chaseX, this.chaseY]; // PseudoPacman Q
    this.updatPerRound();
  }

  updatPerRound() {
    this.hp += this.scene.round * 5;
    this.atk += this.scene.round * 3;
    this.speed += this.scene.round * 2;
  }

  initAnimation() {
    this.unit.on('animationcomplete_attkG', (anim, frame) => {
      this.attack(anim, frame);
    });
  }

  playWalking() {
    this.unit.anims.play('walkG', true);
    this.walking = true;
  }

  attack(anim, frame) {
    if (frame.frame.name > 19) {
      super.attack(this.kill);
    }
  }

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.playWalking();
    super.movingSprite(x, y, sx, sy, flip);
  }

  move(delta) {
    switch (delta) {
      case 3:
        this.movingSprite(0, this.speed, -1, 1, true);
        return true;
      case (-2):
        this.movingSprite(-1 * this.speed, 0, -1, 1, true);
        return true;
      case (-3):
        this.movingSprite(0, -1 * this.speed, 1, 1, false);
        return true;
      case 2:
        this.movingSprite(this.speed, 0, 1, 1, false);
        return true;
      default:
    }
    if (this.walking) {
      this.unit.anims.stop();
      this.unit.setFrame(0);
      this.walking = false;
    }
    this.stop();
  }

  stop() {
    super.stop();
    this.walking = false;
    this.unit.anims.stop();
    this.unit.setFrame(0);
  }

  isBlocked(direction, opposite, value) {
    if (this.unit.body.blocked[direction] === true) {
      return this.move(-1 * value);
    } if (this.unit.body.blocked[opposite] === true) {
      return this.move(value);
    }
    return false;
  }

  chaseY(distance) {
    if (distance.ya >= 3) {
      if (this.isBlocked('up', 'down', 2) === false) {
        this.move((distance.y / Math.abs(distance.y)) * -3);
      }
      return true;
    }
    const aux = this.pacmanQueue.shift();
    this.pacmanQueue.push(aux);

    return false;
  }

  chaseX(distance) {
    if (distance.xa >= this.unit.body.width + 3) {
      if (this.isBlocked('right', 'left', 3) === false) {
        this.move((distance.x / Math.abs(distance.x)) * -2);
      }
      return true;
    }
    const aux = this.pacmanQueue.shift();
    this.pacmanQueue.push(aux);

    return false;
  }

  onAbsoluteRange(target) {
    if (target.xa >= this.unit.body.width + 3 || target.ya >= 3) {
      return true;
    }
    return false;
  }

  chase(target) {
    this.qElement = this.pacmanQueue[0]; /* eslint-disable-line prefer-destructuring */
    if (this.onAbsoluteRange(target)) {
      this.qElement(target);
      return true;
    }
    this.stop();
    this.fliponTarget(target);
    super.setState(1);
    return false;
  }
  
  updateStats(constante) {
    this.hp += constante;
    this.atk += constante;
    this.speed += 2;
  };

  update() {
    const { state } = this;
    const target = super.absolutDistanceR(this.kill);
    switch (state) {
      case 0: {
        this.chase(target);
        return super.update();
      }
      case -1: {
        return super.update();
      }
      case 1: {
        super.fliponTarget(this.kill.unit);
        if (!this.onAbsoluteRange(target)) {
          this.unit.anims.play('attkG', true);
        } else {
          super.setState(0);
        }
        return super.update();
      }
      default:
        return super.update();
    }
  }
}
