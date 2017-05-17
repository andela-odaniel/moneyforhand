const Transaction = require('../models/transaction');
const Merchant = require('../models/merchant');
const TransactionController = {
  makePayment: (request, reply) => {
    const newTransaction = new Transaction({});
    if (request.payload) {
      newTransaction.transactionId = request.payload.transactionId;
      const merchantId = request.payload.merchantId;
      Merchant.findOne({ _id: merchantId }, (err, character) => {
        if (err) {
          reply('Merchant does not exist!');
        }
        else {
          newTransaction.merchantId = request.payload.merchantId;
          newTransaction.amount = request.payload.amount;
          newTransaction.transactionCurrency = request.payload.transactionCurrency;
          newTransaction.customerIdentifier = request.payload.customerIdentifier || null;
          newTransaction.customerEmail = request.payload.customerEmail;
          newTransaction.save((err) => {
            if (err) {
              let errorMessage = "";
              const errors = err.errors;
              for (let errorKey in errors) {
                errorMessage = `${errorMessage} ${errors[errorKey].message}`;
                errorMessage = errorMessage.replace('Path ', '');
              }
              reply('Error occurred during transaction. Try Again! ' + errorMessage);
            }
            else {
              reply('Payment was successful');
            }
          })
        }
      });
    }
    else {
      reply('POST Data Missing')
    }
  },
  startPayment: (request, reply) => {
    if(request.payload){
      const { merchantId } = request.payload;
      Merchant.findOne({ _id: merchantId}, (err, character) => {
        if(err) {
          reply.view('incomplete', { error: 'Merchant not Found' });
        }
        const newTransaction = new Transaction({});
        newTransaction.merchantId = request.payload.merchantId;
        newTransaction.amount = request.payload.amount || null;
        newTransaction.transactionCurrency =
          request.payload.transactionCurrency || null;
        newTransaction.customerIdentifier =
          request.payload.customerIdentifier || null;
        newTransaction.customerEmail =
          request.payload.customerEmail || null;
        newTransaction.save((err) => {
          if (err) {
              let errorMessage = "";
              const errors = err.errors;
              for (let errorKey in errors) {
                errorMessage = `${errorMessage} ${errors[errorKey].message}`;
                errorMessage = errorMessage.replace('Path ', '');
              }
              reply.view('error',{ error: errorMessage});
            }
            else {
              reply.view('payment', { shouldFail: request.payload.shouldFail || false });
            }
        });
      });
    } else {
      reply.view('incomplete', { error: 'No payment details were sent' });
    }


  },
  finishPayment: (request, reply) => {
    reply.redirect('http://www.google.com');
  }
};

module.exports = TransactionController;
