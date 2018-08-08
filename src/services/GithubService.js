import axios from 'axios';

const GithubService = {
    getData(url) {
        return axios({
              mehod: 'GET',
              url: url,
              timeout: 5000,
          })
          .then( (resp) => {
              return resp.data;
          })
          .catch((error) => {
            //handle error
            console.error(error);
        });
    }
}

export default GithubService;
