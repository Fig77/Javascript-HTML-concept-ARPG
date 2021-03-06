/* eslint-disable consistent-return */
import Unit from './Unit';

export default class Player extends Unit {
  constructor(scene, x = 409, y = 590, hp = 100, atk = 15, def = 0) {
    super(scene, x, y, hp, atk, def, 'adventurer');
    this.cursor = scene.input.keyboard.createCursorKeys();
    this.idleConfig = {
      delay: 1000 * 5,
      callback: this.toggleIddle,
      callbackScope: this,
    };
    this.initAnimation();
    this.timer = this.scene.time.addEvent(this.idleConfig);
    this.unit.body.setSize(this.unit.width - 3, this.unit.height - 4, true);
    this.pendingStat = 0;
    this.speed = 90;
    this.scene.input.keyboard.on('keydown_SHIFT', () => {
      this.speed += 50;
      this.currentHp -= 2;
    });
    this.scene.input.keyboard.on('keyup_SHIFT', () => {
      this.speed -= 50;
    });
    this.scene.input.keyboard.on('keydown_A', () => {
      this.unit.anims.play('advatk1', true);
    });
    this.lastFramAtk = -1;
  }

  initAnimation() {
    this.unit.on('animationupdate_advatk1', (anim, frame) => {
      this.attack(anim, frame);
    });
  }

  playWalking() {
    this.unit.anims.play('walk', true);
    this.walking = true;
  }

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.playWalking();
    super.movingSprite(x, y, sx, sy, flip);
  }

  move() {
    if (this.cursor.down.isDown) {
      this.movingSprite(0, this.speed, -1, 1, true);
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.left.isDown) {
      this.movingSprite(-1 * this.speed, 0, -1, 1, true);
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.up.isDown) {
      this.movingSprite(0, -1 * this.speed, 1, 1, false);
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.right.isDown) {
      this.movingSprite(this.speed, 0, 1, 1, false);
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.walking) {
      this.unit.anims.stop();
      this.unit.setFrame(0);
      this.walking = false;
    }
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
    return false;
  }

  toggleIddle() {
    this.unit.play('idle');
    this.timer = this.scene.time.addEvent(this.idleConfig);
  }

  setCamera() {
    this.scene.cameras.main.startFollow(this.unit);
    this.scene.cameras.main.roundPixels = true;
  }

  getTarget() {
    let i = 0;
    let target = this.scene.enemyGroup[i];
    let distance = null;
    while (i < this.scene.enemyGroup.length) {
      target = this.scene.enemyGroup[i];
      if (target !== undefined && target !== null) {
        distance = super.absolutDistanceR(target);
        if ((distance.xa <= this.unit.body.width + 3) && distance.ya <= 3) {
          return target;
        }
      }
      i += 1;
    }
    return false;
  }

  attack(anim, frame) {
    const target = this.getTarget();
    if (frame.textureFrame === 34) {
      if (target !== false) {
        super.attack(target);
      }
    }
    return false;
  }

  update() {
    const state = super.update();
    if (state === -5) {
      return state;
    }
    this.move();
  }
}