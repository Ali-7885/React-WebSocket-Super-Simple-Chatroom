
const request = require('supertest')
const express = require('express')
var assert = require('assert')
var http = require('http')
//var  socketio = require('./../server')
var io = require('socket.io-client')

describe('loading express', function() {
  var server;
  beforeEach(function () {
//      server = require('./server');
   });
   afterEach(function () {
//      server.close();
   });
  it('responds to /', function(done) {
  // request(server)
    request('/')
      .get('/')
      .expect(200, done);
  })
  it('404 everything else', function testPath(done) {
     request('/')
       .get('/foo/bar')
       .expect(404, done);
   })
})

// var options ={
//   transports: ['websocket'],
//   'force new connection': true
// };

 describe('Socket.io Test', ()=> {
       var client = request('/')
      //  var server = http.createServer().listen(0);
})
  //  socketio(server, client);

  // beforeEach(function(done){
  //   ioClient1 = io('http://localhost:' + server.address().port + '/', options);
  //   ioClient2 = io('http://localhost:' + server.address().port + '/', options);
  //   //all tests require a user created
  //   ioClient.on('connect', function(){
  //     ioClient2.on('connect', function(){
  //       ioClient.emit('add', 'josh', 'area', function(){
  //         ioClient2.emit('add', 'josh2', 'area', function(){
  //           done();
  //         });
  //       });
  //     });
  //   });
  // });

  // it('should add a message', function(done){
  //   client.multi()
  //     .get(')
  //     .exec(function(err, results) {
  //       assert.strictEqual(results[0], '');
  //       done();
  //     });
  // });
