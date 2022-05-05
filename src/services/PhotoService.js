import axios from 'axios';

const API_URL = 'http://localhost:9000/api/';

class PhotoService {
  generateImage(fileName, frameID) {
    return axios
      .post(API_URL + 'generate-image', {
        fileName,
        frameID
      })
      .then(response => {
        return response.data;
      });
  }

  getFrame(ID) {
    return axios.get(API_URL + 'get-frame')
    .then(response => {
        return response.data;
      }
    );
  }

  sendEmail(fileName, frameID, email, recipientName) {
    return axios
      .post(API_URL + 'send-email', {
        fileName,
        frameID,
        email,
        recipientName
      })
      .then(response => {
        return response.data;
      });
  }
}

export default new PhotoService();