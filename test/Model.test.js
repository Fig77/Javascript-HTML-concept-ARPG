//import "core-js/stable";
import "regenerator-runtime/runtime";
import { getRequest } from '../src/Model';


test('getRequest to api const url should be able to GET', async() => {
  const result = await getRequest();
  expect(result.status).toBe(200);
},3000);

test('getRequest to api const url should return a JSON with format {user: str, score:int}', async() => {
  const result = await getRequest();
  expect(result.data).toBe(200);
},3000);
