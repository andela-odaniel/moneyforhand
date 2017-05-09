var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  merchantId: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
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

TransactionSchema.plugin(uniqueValidator, { message: '{PATH} already exists in the database'});

var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
