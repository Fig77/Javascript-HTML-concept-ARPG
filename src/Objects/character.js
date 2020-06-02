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
    // camera cheap fix
    this.player.setCollideWorldBounds(true);
    this.scene.physics.world.enable(this.scene);
  };

  move() {
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(70);
      this.player.setVelocityX(0);
      return true;
    }
    if (this.cursor.up.isDown) {
      this.player.setVelocityY(-70);
      this.player.setVelocityX(0);
      return true;
    }
    if (this.cursor.right.isDown) {
      this.player.setVelocityX(70);
      this.player.setVelocityY(0);
      return true;
    }
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-70);
      this.player.setVelocityY(0);
      return true;
    }
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
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