import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import GameOver from './Scenes/GameOver';
import model from './Model';
import './main.css';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = {
      model,
      bgMusic: null
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Over', GameOver);
    this.scene.start('Boot');
  }
}
model.getRequest();
window.game = new Game();

