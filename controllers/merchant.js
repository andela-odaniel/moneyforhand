const Merchant = require('../models/merchant');
const MerchantController = {
  signUp: (request, reply) => {
    const newMerchant = new Merchant({});
    if (request.payload) {
      newMerchant.username = request.payload.username || null;
      newMerchant.businessName = request.payload.businessName || null;
      newMerchant.email = request.payload.email || null;
      newMerchant.address = request.payload.address || null;
      newMerchant.password = request.payload.password || null;
      newMerchant.save((err) => {
        if (err) {
          let errorMessage = "";
          const errors = err.errors;
          for (let errorKey in errors) {
            errorMessage = `${errorMessage} ${errors[errorKey].message}`;
            errorMessage = errorMessage.replace('Path ', '');
          }
          reply('Error saving user.' + errorMessage);
        } else {
          reply('User created');
        }
      });
    } else {
      reply('POST Data Missing')
    }
  },
  login: (request, reply) => {
    if (request.payload) {
      let username = request.payload.username;
      let password = request.payload.password;
      Merchant.login(username, password, () => {
      })
    } else {
      reply('Please include username and password to login');
    }
  }
};

module.exports = MerchantController;
