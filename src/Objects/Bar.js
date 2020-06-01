import 'phaser';
export default class Bar extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, line) {
    super(scene);
    this.moving = false;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.bar = scene.physics.add.sprite(this.x, this.y, 'bar1');
    this.cursor = scene.input.keyboard.createCursorKeys();
  };

  move(){
    if (this.cursor.down.isDown) {
      this.bar.setVelocityY(140);
      return true;
    }
    if (this.cursor.up.isDown) {
      this.bar.setVelocityY(-140);
      return true;
    }
    this.bar.setVelocityX(0);
    this.bar.setVelocityY(0);
  };

  update() {
    this.move();
  };
};