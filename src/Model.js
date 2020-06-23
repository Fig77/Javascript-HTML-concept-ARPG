import axios from 'axios';

const baseApiUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x2mheK9ynuj1B6F38TME/scores";

const postRequest = async (gameOverData) => {
  try {
    const result = await axios.post(baseApiUrl, {
      gameOverData
    });
    return result;
  } catch (error) {
    throw new Error('Unable to add score to board');
  }
};

const updateScoreBoard = (resp) => {
 let i = 0
 while (i < resp.result['length']) {
   document.getElementById('ul').insertAdjacentHTML('afterbegin', `<li class='li'><span>${resp.result[i].user}</span><span>${resp.result[i].score}</span></li>`);
   i += 1;
 }
 return resp;};


const getRequest = async () => {
  try {
    const data = await axios.get(`${baseApiUrl}`);
    return data;
  } catch (error) {
    throw new Error('Unable to get scores at this time');
  }
};

export {getRequest, postRequest, updateScoreBoard};

//const model = (() => {
//
//  const baseApiUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x2mheK9ynuj1B6F38TME/scores";
//
//  const getRequest = () => {
//    let response = ''
//    fetch(`${baseApiUrl}`, {
//      mode: 'cors',
//    }).then((resp) => resp.json()).then((resp) => {
//      updateScoreBoard(resp)
//    }).catch(function (error) {});
//  };
//
//  const updateScoreBoard = (resp) => {
//    let i = 0
//    while (i < resp.result['length']) {
//      document.getElementById('ul').insertAdjacentHTML('afterbegin', `<li class='li'><span>${resp.result[i].user}</span><span>${resp.result[i].score}</span></li>`);
//      i += 1;
//    }
//    return resp;
//  };
//
//  const postRequest = async (gameOverData) => {
//    const raw = await fetch(`${baseApiUrl}`, {
//      mode: 'cors',
//      method: 'POST',
//      body: gameOverData,
//      headers: {
//        'Content-Type': 'application/json'
//      }
//    });
//    const response = raw;
//    return response;
//  };
//
//  return {
//    getRequest,
//    postRequest
//  };
//})();