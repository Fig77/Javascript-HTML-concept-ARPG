export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x = 50, y = 100, hp = 100, atk = 10, def = 0, mod_hp = 0, mod_atk = 0, mod_def = 0, spritekey = '') {
    super(scene);
    // position
    this.x = x;
    this.y = y;
    // base stats
    this.hp = hp;
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
  }

  initAnimation(config) {
    if (!config) {
      this.scene.anims.create({});
    }
  }

  flipHorizontal(flip) {
    if (!flip) {
      this.unit.body.offset.x = 0;
    } else {
      this.unit.body.offset.x = this.unit.width;
    }
    this.flipped = flip;
  };

  movingSprite(x = 0, y = 0, sx = 1, sy = 1, flip = true) {
    this.unit.setVelocityY(y);
    this.unit.setVelocityX(x);
    this.unit.setScale(sx, sy);
    this.flipHorizontal(flip);
  };

  getSprite() {
    return this.unit;
  }

  setCamera() {
    this.scene.cameras.main.startFollow(this.unit);
    this.scene.cameras.main.roundPixels = true;
  }

  update() {};
};