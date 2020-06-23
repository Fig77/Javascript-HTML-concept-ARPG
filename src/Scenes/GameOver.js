/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create(score) {
    this.score = score.score;
    this.player = score.player;
    this.postData = { user: this.player, score: this.score };
    this.add.text(55, 55, `Final Score: ${this.score}`, {
      fontSize: '32px',
      fill: '#fff',
    });
    this.add.text(55, 95, 'Final Build: ', {
      fontSize: '32px',
      fill: '#fff',
    });
    const keys = [`Max Hp: ${this.player.hp}`, `Max Atk: ${this.player.atk}`, `Max Speed: ${this.player.speed}`];
    for (let i = 0; i < 3; i += 1) {
      this.add.text(55, 135 + 40 * (i + 1), keys[i], {
        fontSize: '32px',
        fill: '#fff',
      });
    }
    this.unit = this.physics.add.sprite(this.player.unit);
    this.unit.x = 55 + 250;
    this.unit.y = 110;
    this.unit.anims.play('idle');
    this.submit = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Submit', 'Title', this.score);

    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 200, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
