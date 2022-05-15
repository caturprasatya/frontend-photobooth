import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/transaction/';

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
    return axios.get(API_URL + ID)
    .then(response => {
        localStorage.setItem("transaction", JSON.stringify(response.data));
        return response.data;
      }
    );
  }

  getLatestTransaction() {
    return JSON.parse(localStorage.getItem('transaction'));
  }
}

export default new PaymentService();