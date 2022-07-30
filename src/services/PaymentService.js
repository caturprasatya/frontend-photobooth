import axios from 'axios';

const API_URL = 'https://api.snaplab.site/dev/api/v1/transaction/';
const API_URL_LOGIN = "https://api.snaplab.site/dev/api/v1/admin/login";

class PaymentService {
  createTransaction(amount, paymentType) {
    return axios
      .post(API_URL, {
        amount,
        payment_type: paymentType
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
        // if (response.data.accessToken) {
        //   // localStorage.setItem("login", JSON.stringify(response.data));
        // }
      return response.data;
    })
  };

  getBypass(token){
    return axios.post(API_URL + "bypass",
    {
      "amount": 35000,
      "status": "pending"
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      return response.data;
    })
  };
}

export default new PaymentService();