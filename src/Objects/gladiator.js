import 'phaser';
import Unit from '../Objects/Unit';

export default class Gladiator extends Unit {
  constructor(scene, x = 1489.0000000000239, y = 100, hp = 400, atk = 20, def = 5, mod_hp = 0, mod_atk = 0, mod_def = 0, text = 'gladiator') {
    super(scene, x, y, hp, atk, def, mod_hp, mod_atk, mod_def, text, 4.5);
    //super.initAnimation();
    //this.initAnimation();
    this.timer = this.scene.time.addEvent(this.idleConfig);
    this.text = text;
    this.kill = scene.player;
    this.attack_range = 5;
    this.speed = 60;
    this.dire = 1;
    this.unit.body.setImmovable(true);
    this.dX = 0;
    this.last = {
      x: x,
      y: y
    };
    this.pacmanQueue = [this.chaseX, this.chaseY];
    this.unit.bounce
  };

  initAnimation() {
    this.scene.anims.create({
      key: 'walkG',
      frames: this.scene.anims.generateFrameNumbers('gladiator', {
        start: 9,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'attkG',
      frames: this.scene.anims.generateFrameNumbers('gladiator', {
        start: 16,
        end: 23
      }),
      frameRate: 6,
      repeat: false
    });

    this.unit.on('animationcomplete_attkG', (anim, frame) => {
      this.attack(anim, frame)
    });
  };

  playWalking() {
    this.unit.anims.play('walkG', true);
    this.walking = true;
  };

  attack(anim, frame) {
    if (frame > 19) {
      super.attack(this.kill);
    }
  };

  // movingSprite will adjust the moving sprite according to direction / speed
  // Keep in mind that for now I am adjusting it with scale, care.

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.playWalking();
    super.movingSprite(x, y, sx, sy, flip);
  };

  move(delta) {
    switch (delta) {
      case 3:
        this.movingSprite(0, this.speed, -1, 1, true);
        return true;
        break;
      case (-2):
        this.movingSprite(-1 * this.speed, 0, -1, 1, true);
        return true;
        break;
      case (-3):
        this.movingSprite(0, -1 * this.speed, 1, 1, false);
        return true;
        break;
      case 2:
        this.movingSprite(this.speed, 0, 1, 1, false);
        return true;
        break;
      default:
        // code block
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

  incapacitate() {
    this.unit.anims.play('incGladiator', true);
  };

  isBlocked(direction, opposite, value) {
    if (this.unit.body.blocked[direction] === true) {
      return this.move(-1 * value);
    } else if (this.unit.body.blocked[opposite] === true) {
      return this.move(value);
    }
    return false;
  }

  chaseY(distance) {
    if (distance.ya >= 3) {
      if (this.isBlocked('up', 'down', 2) === false) {
        this.move(distance.y / Math.abs(distance.y) * -3);
      }
      return true;
    } else {
      let aux = this.pacmanQueue.shift();
      this.pacmanQueue.push(aux);
    }
    return false;
  }

  chaseX(distance) {
    if (distance.xa >= this.unit.body.width + 3) {
      if (this.isBlocked('right', 'left', 3) === false) {
        this.move(distance.x / Math.abs(distance.x) * -2);
      }
      return true;
    } else {
      let aux = this.pacmanQueue.shift();
      this.pacmanQueue.push(aux);
    }
    return false;
  }

  chase() {
    let target = super.absolutDistanceR(this.kill);
    this.qElement = this.pacmanQueue[0];

    if (target.xa >= this.unit.body.width + 3 || target.ya >= 3) {
      this.qElement(target);
      return true;
    } else {
      this.stop();
      super.setState(1);
      return false;
    }
  }

  update() {
    let state = super.update()
    if (state === 0) {
      this.chase();
    } else if (state === 1) {
      this.unit.anims.play('attkG', true);
    }
  };
};