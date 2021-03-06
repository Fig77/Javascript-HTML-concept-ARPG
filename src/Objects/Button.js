import Phaser from 'phaser';
import { postRequest } from '../Model';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene, callback = null) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '32px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      if (callback === null) {
        this.scene.scene.start(targetScene);
      } else {
        let user = 'username';
        if (document.querySelector('#username').value !== '') {
          user = document.querySelector('#username').value;
        }
        this.scoreData = { user: `${user}`, score: callback };
        postRequest(this.scoreData);
        this.scene.scene.start('Game');
      }
    });
    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}