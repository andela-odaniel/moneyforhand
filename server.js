"use strict"

const Hapi = require('Hapi');

const server = new Hapi.Server();

const MerchantController = require('./controllers/merchant');
const TransactionController = require('./controllers/transaction');

server.connection({
  host: 'localhost',
  port: 8000
});


server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Issa Live');
  }
});

server.route({
  method: 'POST',
  path: '/merchants/signup',
  handler: MerchantController.signUp
});

server.route({
  method: 'POST',
  path: '/merchants/login',
  handler: MerchantController.login
});

server.route({
  method: 'POST',
  path: '/transaction/pay',
  handler: TransactionController.makePayment
});

server.start((error) => {
  if (error) throw error;
  console.log('Server running at: ', server.info.uri);
});
