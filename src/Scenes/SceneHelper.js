const sceneHelper = (() => {
  const animCreate = (scene) => {
    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('adventurer', {
        start: 16,
        end: 22
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('adventurer', {
        start: 0,
        end: 12
      }),
      frameRate: 6,
      repeat: false
    });

    scene.anims.create({
      key: 'advatk1',
      frames: scene.anims.generateFrameNumbers('adventurer', {
        start: 32,
        end: 39
      }),
      frameRate: 6,
      repeat: false
    });

    scene.anims.create({
      key: 'walkG',
      frames: scene.anims.generateFrameNumbers('gladiator', {
        start: 9,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'attkG',
      frames: scene.anims.generateFrameNumbers('gladiator', {
        start: 16,
        end: 22
      }),
      frameRate: 6,
      repeat: false
    });
    scene.anims.create({
      key: 'incGladiator',
      frames: scene.anims.generateFrameNumbers('gladiator', {
        start: 23,
        end: 25
      }),
      frameRate: 1,
      repeat: true
    });
  }

  return {
    animCreate
  };
})();

export default sceneHelper;