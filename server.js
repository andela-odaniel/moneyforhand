"use strict"

const Hapi = require('Hapi');

const server = new Hapi.Server();

const MerchantController = require('./controllers/merchant');

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

server.start((error) => {
  if (error) throw err;
  console.log('Server running at: ', server.info.uri);
});
