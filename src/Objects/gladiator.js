import 'phaser';
import Unit from '../Objects/Unit';

export default class Gladiator extends Unit {
  constructor(scene, x = 1489.0000000000239, y = 100, hp = 400, atk = 20, def = 5, mod_hp = 0, mod_atk = 0, mod_def = 0, text = 'gladiator') {
    super(scene, x, y, hp, atk, def, mod_hp, mod_atk, mod_def, text);
    this.initAnimation();
    this.timer = this.scene.time.addEvent(this.idleConfig);
    this.text = text;
    this.kill = scene.player;
    this.attack_range = 5;
    this.speed = 60;
    this.dire = 1;
    this.last = {
      x: x,
      y: y
    };
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
  };

  playWalking() {
    this.unit.anims.play('walkG', true);
    this.walking = true;
  };

  agroTarget() {
    if ((Math.abs(this.kill.unit.x - this.unit.x) < 150 && (Math.abs(this.kill.unit.x - this.unit.x) < 150)) && this.agroed === false) {
      this.speed += 45;
      this.agroed = true;
    } else {
      this.cathTarget((this.kill.unit.x - this.unit.x), (this.kill.unit.y - this.unit.y));
    }
  };

  cathTarget(dx, dy) {
    let flip = 1;
    let bolflip = false;

    this.movingSprite(movx, movy, flip, 1, false);
  }

  // movingSprite will adjust the moving sprite according to direction / speed
  // Keep in mind that for now I am adjusting it with scale, care.

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.playWalking();
    super.movingSprite(x, y, sx, sy, flip);
  };

  move(delta) {
    switch (delta) {
      case 1:
        this.movingSprite(0, this.speed, -1, 1, true);
        return true;
        break;
      case 2:
        this.movingSprite(-1 * this.speed, 0, -1, 1, true);
        return true;
        break;
      case 3:
        this.movingSprite(0, -1 * this.speed, 1, 1, false);
        return true;
        break;
      case 4:
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
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
    this.last.x = this.unit.x;
    this.last.y = this.unit.y;
  }

  getOrtogonalDistance() {
    let x = this.kill.unit.x - this.unit.x;
    let y = this.kill.unit.y - this.unit.y;
    return {
      x,
      y
    };
  };

  chase() {
    let distance = this.getOrtogonalDistance();
    if (Math.round(distance.x) >= 1) {
      this.movingSprite((distance.x / Math.abs(distance.x)) * this.speed);
    } else if (Math.round(distance.y) >= 1) {
      this.movingSprite(0, (distance.y / Math.abs(distance.y)) * this.speed);
    } else {
      this.unit.setVelocityX(0);
      this.unit.setVelocityY(0);
      this.walking = false;
      this.unit.anims.stop();
      this.unit.setFrame(0);
    }

  }

  update() {
    this.chase();

  };
};