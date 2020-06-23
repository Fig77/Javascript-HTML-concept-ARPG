import axios from 'axios';

const baseApiUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x2mheK9ynuj1B6F38TME/scores";

const postRequest = async (gameOverData) => {
  try {
    const result = await axios.post(`${baseApiUrl}`, {
      user: gameOverData.user,
      score: gameOverData.score,
    });
    return result;
  } catch (error) {
    throw new Error('Unable to add score to board');
  }
};

const updateScoreBoard = async () => {
 let resp = await getRequest();
 resp = resp.data;
 let i = 0
 while (i < resp.result['length']) {
   document.getElementById('ul').insertAdjacentHTML('afterbegin', `<li class='li'><span>${resp.result[i].user}</span><span>${resp.result[i].score}</span></li>`);
   i += 1;
 }
};


const getRequest = async () => {
  try {
    const data = await axios.get(`${baseApiUrl}`);
    return data;
  } catch (error) {
    throw new Error('Unable to get scores at this time');
  }
};

export {getRequest, postRequest, updateScoreBoard};
