import 'phaser';
export default class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x = 50, y = 100, hp = 100, atk = 10, def = 0, mod_hp = 0, mod_atk = 0, mod_def = 0) {
    super(scene);
    this.x = x;
    this.y = y;
    // base stats
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    // modifiers
    this.mod_hp = mod_hp;
    this.mod_atk = mod_atk;
    this.mod_def = mod_def;
    // sprite
    this.player = scene.physics.add.sprite(50, 100, 'adventurer');
    this.cursor = scene.input.keyboard.createCursorKeys();
    this.initAnimation();
    this.idleConfig = {
      delay: 1000 * 5,
      callback: this.toggleIddle,
      callbackScope: this
    };
    this.timer = this.scene.time.addEvent(this.idleConfig);
  };

  initAnimation() {
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
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('adventurer', {
        start: 15,
        end: 20
      }),
      frameRate: 6,
      repeat: false
    });

  }

  move(delta) {
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(70);
      this.player.setVelocityX(0);
      this.player.setScale(-1, 1);
      this.player.body.offset.x -= 1;
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.up.isDown) {
      this.player.setVelocityY(-70);
      this.player.setVelocityX(0);
      this.player.setScale(1, 1);
      this.player.body.offset.x = -1;
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.right.isDown) {
      this.player.setVelocityX(70);
      this.player.setVelocityY(0);
      this.player.setScale(1, 1);
      this.player.body.offset.x *= -1;
      this.timer.reset(this.idleConfig);
      return true;
    }
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-70);
      this.player.setVelocityY(0);
      this.player.setScale(-1, 1);
      this.player.body.offset.x += 1;
      this.timer.reset(this.idleConfig);
      return true;
    }
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
  };

  toggleIddle() {
    this.player.play('idle');
    this.timer = this.scene.time.addEvent(this.idleConfig);
  };

  getSprite() {
    return this.player;
  }

  setCamera() {
    this.scene.cameras.main.startFollow(this.player);
    this.scene.cameras.main.roundPixels = true;
  }

  update() {
    this.move();
  };
};