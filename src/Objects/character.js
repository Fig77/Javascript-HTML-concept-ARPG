import 'phaser';
import Unit from '../Objects/Unit';

export default class Player extends Unit {
  constructor(scene, x = 409, y = 590, hp = 100, atk = 10, def = 0, mod_hp = 0, mod_atk = 0, mod_def = 0) {
    super(scene, x, y, hp, atk, def, mod_hp, mod_atk, mod_def, 'adventurer');
    this.cursor = scene.input.keyboard.createCursorKeys();
    this.idleConfig = {
      delay: 1000 * 5,
      callback: this.toggleIddle,
      callbackScope: this
    };
    this.initAnimation();
    this.timer = this.scene.time.addEvent(this.idleConfig);
    this.unit.body.setSize(this.unit.width - 3, this.unit.height - 4, true);
    this.pendingStat = 0;
    this.speed = 90;
    // non cursor keys 
    this.scene.input.keyboard.on('keydown_SHIFT', () => {
      this.speed += 50;
      this.currentHp -= 2;
    });
    this.scene.input.keyboard.on('keyup_SHIFT', () => {
      this.speed -= 50;
    });
    this.scene.input.keyboard.on('keydown_A', () => {
      this.attack();
    });

  };

  initAnimation() {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('adventurer', {
        start: 16,
        end: 22
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('adventurer', {
        start: 0,
        end: 12
      }),
      frameRate: 6,
      repeat: false
    });

    this.scene.anims.create({
      key: 'advatk1',
      frames: this.scene.anims.generateFrameNumbers('adventurer', {
        start: 32,
        end: 39
      }),
      frameRate: 6,
      repeat: false
    });
  };

  playWalking() {
    this.unit.anims.play('walk', true);
    this.walking = true;
  };
  
  hardStop() {
    this.unit.setVelocityX(0);
    this.unit.setVelocityY(0);
    this.walking = false;
  };

  // movingSprite will adjust the moving sprite according to direction / speed
  // Keep in mind that for now I am adjusting it with scale, care.

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.playWalking();
    super.movingSprite(x, y, sx, sy, flip);
  };

  move(delta) {
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
  };

  toggleIddle() {
    this.unit.play('idle');
    this.timer = this.scene.time.addEvent(this.idleConfig);
  };

  setCamera() {
    this.scene.cameras.main.startFollow(this.unit);
    this.scene.cameras.main.roundPixels = true;
  }

  attack() {
    this.unit.anims.play('advatk1', true);
    this.hardStop()
  };

  update() {
    super.update();
    this.move();
  };
};