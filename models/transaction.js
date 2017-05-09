var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  merchantId: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  transactionCurrency: {
    type: String,
    required: true
  },
  customerIdentifier: {
    type: String
  },
  customerEmail: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
