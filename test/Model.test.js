import {getRequest} from '../src/Model';

test('getRequest will instantly return a json with users submitted scores', async() => {
  let test = await getRequest;
  console.log(test);
});

test('Calling call request with json formatted as {user: str:name, score: int:score} should update the scores db', () => {});

