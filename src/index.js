/* eslint-disable import/no-extraneous-dependencies */
import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import CreditsScene from './Scenes/CreditsScene';
import GameOver from './Scenes/GameOver';
import { updateScoreBoard } from './Model';
import './main.css';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = {
      bgMusic: null,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Over', GameOver);
    this.scene.start('Boot');
  }
}

updateScoreBoard();
const name = document.querySelector('#name');
const username = document.querySelector('#username');
document.querySelector('#button').addEventListener('click', () => {
  if (name.value !== '') {
    username.value = name.value;
  }
});
window.game = new Game();
