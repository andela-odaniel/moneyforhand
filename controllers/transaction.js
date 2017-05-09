const Transaction = require('../models/transaction');
const TransactionController = {
  makePayment: (request, reply) => {
    const newTransaction = new Transaction({});
    if (request.payload) {
      newTransaction.merchantId = request.payload.merchantId;
      newTransaction.amount = request.payload.amount;
      newTransaction.transactionCurrency = request.payload.transactionCurrency;
      newTransaction.customerIdentifier = request.payload.customerIdentifier || null;
      newTransaction.customerEmail = request.payload.customerEmail;
      newTransaction.save((err) => {
          if(err) {
            let errorMessage = "";
          const errors = err.errors;
          for (let errorKey in errors) {
            errorMessage = `${errorMessage} ${errors[errorKey].message}`;
            errorMessage = errorMessage.replace('Path ', '');
          }
          reply('Error occurred during transaction. Try Again' + errorMessage);
        }
        else {
          reply('Payment was successful');
        }
      })
    }
    else {
      reply('POST Data Missing')
    }
  }
};

module.exports = TransactionController;
