import axios from 'axios';

const API_URL = 'http://localhost:9000/api/';

class PhotoService {
  generateImage(txID, frameID) {
    return axios
      .post(API_URL + 'generate-image', {
        tx_id: txID,
        frame_id: frameID
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

  sendEmail(txID, effect, email, recipientName) {
    return axios
      .post(API_URL + 'send-email', {
        tx_id: txID,
        effect: effect,
        email: email,
        recipient_name: recipientName
      })
      .then(response => {
        return response.data;
      });
  }

  printImage(txID, effect) {
    return axios
      .post(API_URL + 'print-image', {
        tx_id: txID,
        effect: effect
      })
      .then(response => {
        return response.data;
      });
  }
}

export default new PhotoService();