import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

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
    return axios.get(API_URL + 'v2/get-frame')
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

  printImage(txID, effect, isNoCut) {
    return axios
      .post(API_URL + 'print-image', {
        tx_id: txID,
        effect: effect,
        is_no_cut : isNoCut
      })
      .then(response => {
        return response.data;
      });
  }

  uploadImage(txID, imageBlob){
    let formData = new FormData();
    formData.append('tx_id', txID);
    imageBlob.forEach((image,index) => {
      formData.append('img_file', image, (index+1).toString() + '.png');
    });
    return axios
      .post(API_URL + 'upload-image', formData, {headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then(response => {
        return response.data;
      })
  }
}

export default new PhotoService();