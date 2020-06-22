const GameScene = require('../src/Scenes/GameScene');

describe('GameScene initiated tests', () => {
  const Game = GameScene.default;
  const game = new Game();
  game.scene.start('Game');

  test('When game starts, score should be 10', () => {

  });

});