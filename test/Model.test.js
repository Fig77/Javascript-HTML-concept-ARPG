import "core-js/stable";
import "regenerator-runtime/runtime";
import model from '../src/Model';


test('getRequest will return a json with users submitted scores', () => {
  const dummyMoviesData = [
    {
      user: 'some-tilte-1',
      score: 'some-1'
    },
    {
      user: 'some-tilte-2',
      score: 'some-2'
    },
    {
      user: 'some-tilte-3',
      score: 'some-3'
    }
];
  global.fetch = jest.fn(() => Promise.resolve(dummyMoviesData));
  const resp = model.getRequest();
  expect(resp).toBe(5);
});

test('Calling call request with json formatted as {user: str:name, score: int:score} should update the scores db', () => {});