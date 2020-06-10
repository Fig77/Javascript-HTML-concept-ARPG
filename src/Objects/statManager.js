import 'phaser';

export default class statManager extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }

  initManager() {
    this.box = this.scene.add.image(this.scene.arena.widthInPixels - 165, this.scene.arena.heightInPixels - 130, 'statbox');
    this.button1 = this.scene.add.image(this.box.x + 35, this.box.y - 100, 'arrow').setInteractive();
    this.button2 = this.scene.add.image(this.box.x + 35, this.box.y - 60, 'arrow').setInteractive();
    this.button3 = this.scene.add.image(this.box.x + 35, this.box.y - 20, 'arrow').setInteractive();
    this.button4 = this.scene.add.image(this.box.x + 35, this.box.y + 20, 'arrow').setInteractive();
    this.loadStatusText();
    this.boundEvent();
  };

  loadStatusText() {
    this.textSpeed = this.scene.add.text(this.box.x - 85, this.box.y - 105, 'Speed: ' + this.scene.player.speed, {
      fontSize: '15px',
      fill: '#fff'
    });
    this.textHp = this.scene.add.text(this.box.x - 85, this.box.y - 65, 'Max Hp: ' + this.scene.player.hp, {
      fontSize: '15px',
      fill: '#fff'
    });
    this.textAtk = this.scene.add.text(this.box.x - 85, this.box.y - 25, 'Atk: ' + this.scene.player.atk, {
      fontSize: '15px',
      fill: '#fff'
    });
    this.textCurrent = this.scene.add.text(this.box.x - 85, this.box.y + 10, 'Hp: ' + this.scene.player.currentHp + '/' + this.scene.player.hp, {
      fontSize: '15px',
      fill: '#fff'
    });
    this.textPoints = this.scene.add.text(this.box.x - 85, this.box.y + 80, 'Pending: ' + this.scene.player.pendingStat, {
      fontSize: '15px',
      fill: '#fff'
    });
  };

  destroyMe() {
    this.box.destroy();
    this.button1.destroy();
    this.button2.destroy();
    this.button3.destroy();
    this.button4.destroy();
    this.textSpeed.destroy();
    this.textHp.destroy();
    this.textAtk.destroy();
    this.textCurrent.destroy();
    this.textPoints.destroy();
  };

  boundEvent() {
    this.button1.on('pointerdown', function () {
      this.addStat(1)
    }.bind(this));
    this.button2.on('pointerdown', function () {
      this.addStat(2)
    }.bind(this));
    this.button3.on('pointerdown', function () {
      this.addStat(3)
    }.bind(this));
    this.button4.on('pointerdown', function () {
      this.addStat(4)
    }.bind(this));
  };

  addStat(stat) {
    if (this.scene.player.pendingStat !== 0) {
      switch (stat) {
        case 1:
          this.scene.player.speed += 10;
          break;
        case 2:
          this.scene.player.hp += 20;
          break;
        case 3:
          this.scene.player.atk += 5;
          break;
        default:
      };
    }
  }

  toggleDead() {
    if (this.currentHp <= 0) {
      this.destroy();
    }
  };
};