var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = mongoose.model('Transaction', new Schema({
  merchantId: String,
  transactionId: String,
  transactionCurrency: String,
  customerIdentifier: String,
  customerEmail: String,
  amount: Number,
  email: String,
  address: String,
}));

module.exports = Merchant;
