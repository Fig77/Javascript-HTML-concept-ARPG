//import "core-js/stable";
import {
  matchers
} from 'jest-json-schema';
expect.extend(matchers);
import "regenerator-runtime/runtime";
import {
  getRequest,
  postRequest
} from '../src/Model';


test('getRequest to api const url should be able to GET', async () => {
  const result = await getRequest();
  expect(result.status).toBe(200);
}, 3000);

test('getRequest to api const url should return a JSON with format {user: str, score:int}', async () => {
  const result = await getRequest();
  const schema = {
    properties: {
      user: {
        type: 'string'
      },
      score: {
        type: 'integer'
      }
    },
    required: [],
  };
  expect(result.data).toMatchSchema(schema);
}, 4000);

test('postRequest will send succesfuly a POST to the api const url', async () => {
  const data = await postRequest({
    user: 'Tester-1',
    score: 10
  });
  expect(data.status).toBe(201);
  expect(data.statusText).toBe('Created');
}, 4000);