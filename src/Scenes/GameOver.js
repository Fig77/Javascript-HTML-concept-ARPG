import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload() {}
  create() {
    this.playerStats = playerStats;
    this.gameStats = gameStats;
    console.log('this.playerStats');
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Menu', 'Menu');
  }
}