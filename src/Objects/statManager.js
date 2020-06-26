import Phaser from 'phaser';

export default class statManager extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.drawed = false;
  }

  initManager() {
    this.box = this.scene.add.image(this.scene.cameras.main.worldView.x + 535, this.scene.cameras.main.worldView.y + 370, 'statbox');
    this.button1 = this.scene.add.image(this.box.x + 35, this.box.y - 100, 'arrow').setInteractive();
    this.button2 = this.scene.add.image(this.box.x + 35, this.box.y - 60, 'arrow').setInteractive();
    this.button3 = this.scene.add.image(this.box.x + 35, this.box.y - 20, 'arrow').setInteractive();
    this.button4 = this.scene.add.image(this.box.x + 35, this.box.y + 20, 'arrow').setInteractive();
    this.loadStatusText();
    this.boundEvent();
  }

  clearInGameUi() {
    this.currentHpp.destroy();
    this.drawed = false;
  }

  getFUllEnemiesHp() {
    this.fullENemies = 0;
    const group = this.scene.enemyGroup;
    let i = 0;
    while (i < group.length) {
      if (group[i] === null || group[i] === undefined) {
        this.fullENemies += 0;
      } else {
        this.fullENemies += group[i].currentHp;
      }
      i += 1;
    }
  }

  update() {
    this.getFUllEnemiesHp();
    this.currentHpp.setText(`Current Hp: ${this.scene.player.currentHp}`);
    this.currentHpp.x = this.scene.cameras.main.worldView.x + 20;
    this.currentHpp.y = this.scene.cameras.main.worldView.y + 15;
    this.currentEnemies.x = this.scene.cameras.main.worldView.x + 420;
    this.currentEnemies.y = this.scene.cameras.main.worldView.y + 15;
    this.currentEnemies.setText(`Enemies Hp: ${this.fullENemies}`);
  }

  drawIngameUi() {
    this.getFUllEnemiesHp();
    this.currentHpp = this.scene.add.text(this.scene.cameras.main.worldView.x + 20, this.scene.cameras.main.worldView.y + 15, `Currenr Hp: ${this.scene.player.currentHp}`, {
      fontSize: '19px',
      fill: '#fff',
    });
    this.currentEnemies = this.scene.add.text(this.scene.cameras.main.worldView.x + 420, this.scene.cameras.main.worldView.y + 15, `Currenr Hp: ${this.fullENemies}`, {
      fontSize: '19px',
      fill: '#fff',
    });
  }

  loadStatusText() {
    this.textSpeed = this.scene.add.text(this.box.x - 85, this.box.y - 105, `Speed: ${this.scene.player.speed}`, {
      fontSize: '15px',
      fill: '#fff',
    });
    this.textHp = this.scene.add.text(this.box.x - 85, this.box.y - 65, `Max Hp: ${this.scene.player.hp}`, {
      fontSize: '15px',
      fill: '#fff',
    });
    this.textAtk = this.scene.add.text(this.box.x - 85, this.box.y - 25, `Atk: ${this.scene.player.atk}`, {
      fontSize: '15px',
      fill: '#fff',
    });
    this.textCurrent = this.scene.add.text(this.box.x - 85, this.box.y + 10, `Hp: ${this.scene.player.currentHp}/${this.scene.player.hp}`, {
      fontSize: '15px',
      fill: '#fff',
    });
    this.textPoints = this.scene.add.text(this.box.x - 85, this.box.y + 80, `Pending: ${this.scene.player.pendingStat}`, {
      fontSize: '15px',
      fill: '#fff',
    });
  }

  destroyMe() {
    this.box.destroy();
    this.button1.destroy();
    this.button2.destroy();
    this.button3.destroy();
    this.button4.destroy();
    this.destroyText();
  }

  destroyText() {
    this.textSpeed.destroy();
    this.textHp.destroy();
    this.textAtk.destroy();
    this.textCurrent.destroy();
    this.textPoints.destroy();
  }

  boundEvent() {
    this.button1.on('pointerdown', () => {
      this.addStat(1);
    });
    this.button2.on('pointerdown', () => {
      this.addStat(2);
    });
    this.button3.on('pointerdown', () => {
      this.addStat(3);
    });
    this.button4.on('pointerdown', () => {
      this.addStat(4);
    });
  }

  addStat(stat) {
    if (this.scene.player.pendingStat !== 0) {
      switch (stat) {
        case 1:
          this.scene.player.speed += 1;
          this.scene.player.pendingStat -= 1;
          this.destroyText();
          this.loadStatusText();
          break;
        case 2:
          this.scene.player.hp += 1;
          this.scene.player.pendingStat -= 1;
          this.destroyText();
          this.loadStatusText();
          break;
        case 3:
          this.scene.player.atk += 1;
          this.scene.player.pendingStat -= 1;
          this.destroyText();
          this.loadStatusText();
          break;
        case 4:
          this.scene.player.currentHp = this.scene.player.hp;
          this.scene.player.pendingStat -= 1;
          this.destroyText();
          this.loadStatusText();
          break;
        default:
      }
    }
  }
}