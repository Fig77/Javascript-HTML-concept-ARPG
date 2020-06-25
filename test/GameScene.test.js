const GameScene = require('../src/scenes/GameScene');
import StatsUi from '../src/Objects/statManager';
jest.mock('../src/Objects/statManager');
import {
  matchers
} from 'jest-json-schema';

// Setting up GameScene mocks.

const Game = GameScene.default;
const game = new Game();
game.playerInit = jest.fn(function () { // mocking player object
  this.player = {
    "pedingStat": 0,
    "update": () => {
      return 0
    },
    "unit": {
      "x": 10,
      "y": 20,
      "destroy": 1
    }
  }
});
game.addEnemies = jest.fn(function () {
  let i = 0;
  let gladiador = null;
  this.enemyCounter = 0;
  while (i < this.currentNumber) {
    gladiador = {
      "update": () => {
        return -5
      },
      "destroy": () => {
        1
      },
      "unit": {
        "x": 10,
        "y": 20,
        "destroy": () => {
          1
        }
      }
    };
    this.enemyGroup[i] = gladiador;
    this.enemyCounter += 1;
    i += 1;
  }
});

game.statmanager = {
  "drawIngameUi": jest.fn(() => {
    ''
  })
}
game.startGame = jest.fn(function () {
  if (!this.match) {
    this.player.unit.y -= 125;
    this.match = true;
    this.addEnemies();
  }
})
game.arena = {
  "widthInPixels": 20,
  "heightInPixels": 35
};

// Mock set up ended. Will refactored for learning purposes into _mock_ form jest once I clean up a few bugs.

describe('GameScene testing', () => {
  describe('Initialize a blank game scene correctly', () => {
    game.create();
    it('score should be 10 ', () => {
      expect(game.score).toBe(10);
    });

    it('round should be 1 ', () => {
      expect(game.round).toBe(1);
    });

    it('match should be false', () => {
      expect(game.match).toBeFalsy();
    });

    it('stat should be false', () => {
      expect(game.stat).toBeFalsy();
    });

    it('player target should be null', () => {
      expect(game.playerTarget).toBe(null);
    });

    it('maxEnemies should be 3 by default', () => {
      expect(game.maxEnemies).toBe(3);
    });

    it('currentNumber of enemies should be 1 at start', () => {
      expect(game.currentNumber).toBe(1);
    });
  });
});
// Before this point game is blank, has been created but nothing else happened.
describe('GameLoop testing', () => {
  describe('Before Update match initialize', () => {
    test('Will initialize the match', () => {
      game.startGame();

    });
    it('match has started, so matchs should be true', () => {
      expect(game.match).toBeTruthy();
    });

    it('match has started, so one enemy has spawned', () => {
      expect(game.enemyCounter).toBe(1);
    });
    it('First position of enmy group should contain one enemy', () => {
      expect(game.enemyGroup[0].unit.x).toBe(10);
    });
  })
  describe('After Update match initialize. Enemy was killed.', () => {
    test('Will run one update', () => {
      game.player.pendingStat = 0;
      game.startGame();
      game.update();
    });
    test('Enemy was killed, so pending stats should be 5', () => {
      expect(game.player.pendingStat).toBe(5);
    });
    test('Enemy was killed, so score should be 20', () => {
      expect(game.score).toBe(20);
    });
    test('Enemy was killed, since there was only one, enemy counter should be 0', () => {
      expect(game.enemyCounter).toBe(0);
    });
    test('Enemy was killed, since there was only one, enemyGroup[0] shoulld be null', () => {
      expect(game.enemyGroup[0]).toBe(null);
    })
  })
  describe('After Update match results', () => {
    test('Since there were no more enemies, now match should be false', () => {
      expect(game.match).toBeFalsy();
    });
    test('Since there were no more enemies, now match should be false', () => {
      expect(game.match).toBeFalsy();
    });
    test('Now current number should be 2', () => {
      expect(game.currentNumber).toBe(2);
    });
    test('Now, round should be 2', () => {
      expect(game.round).toBe(2);
    });
  });
});