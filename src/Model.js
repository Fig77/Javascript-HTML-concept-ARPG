const model = (() => {
  const baseApiUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x2mheK9ynuj1B6F38TME/scores";
  const postRequest = async (gameOverData) => {
    const raw = await fetch(`${baseApiUrl}`, {
      mode: 'cors',
      method: 'POST',
      body: gameOverData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = raw;
    return response;
  };
  const getRequest = async () => {
    const raw = await fetch(`${baseApiUrl}`, {
      mode: 'cors',
    });
    const response = await raw;
    return response;
  };
  const updateScoreBoard = () => {
    getRequest().then((response) => {
      if (response.status === 200) {
        console.log(JSON.stringify(response.json()));
      } else {
        console.log('0');
        location.innerHTML = response.message;
      }
    });
  };
  return {
    getRequest,
    postRequest,
    updateScoreBoard
  }
})();

export default model;