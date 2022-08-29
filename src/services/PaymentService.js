import axios from 'axios';

const API_URL = 'https://api.snaplab.site/api/v1/transaction/';
const API_URL_LOGIN = "https://api.snaplab.site/api/v1/admin/login";
const API_PROMO = "https://api.snaplab.site/api/v1/promo"

class PaymentService {
  createTransaction(amount, paymentType, locationIndex) {
    return axios
      .post(API_URL, {
        amount,
        payment_type: paymentType,
        location : locationIndex
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("transaction", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  getTransactionByID(ID) {
    return axios.get(API_URL + "trx/" + ID)
    .then(response => {
        localStorage.setItem("transaction", JSON.stringify(response.data));
        return response.data;
      }
    );
  }

  getLatestTransaction() {
    return JSON.parse(localStorage.getItem('transaction'));
  }

  login(email,password) {
    return axios.post(API_URL_LOGIN, {
      email : email,
      password: password
      }).then(response => {
      return response.data;
    })
  };

  getBypass(token){
    return axios.post(API_URL + "bypass",
    {
      "amount": 30000,
      "status": "pending"
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      return response.data;
    })
  };

  getPromo(code){
    return axios.get(API_PROMO + "/code/" + code)
    .then(response => {
      return response.data;
    });
  }

  claimPromo(code){
    return axios.put(API_PROMO + "/claim/" + code)
    .then(response => {
      return response.data;
    });
  }
}

export default new PaymentService();