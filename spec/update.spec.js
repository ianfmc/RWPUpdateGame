var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Update a Game', function() { 

	var context;

	var gameCorrect;
	var gameNoEvents;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'update', function(params, callback) {
			callback();
		});
	});

	beforeEach(function() {
		context = { };
		gameCorrect = {
		    "gameID" : 50,
		    "events" : [
					{
						"type" : "shot",
				 		"location" : { "x" : 50, "y": 50},
				 		"team" : "50",
				 		"capNumber" : "5"
				 	}
				]
			};

		gameNoGameID = {
		    "events" : [
					{
						"type" : "shot",
				 		"location" : { "x" : 50, "y": 50},
				 		"team" : "50",
				 		"capNumber" : "5"
				 	}
				]
		};

		gameNoEvents = {
		    "gameID" : 1477261819718,
		};
	});

	afterEach(function() {
	});

	it('-- Updates a Game with correct data', sinon.test(function(done) {

		app.handler(gameCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Success');

			done();
		});
	}));

	it('-- Fails when no Game ID is found', sinon.test(function(done) {

		app.handler(gameNoGameID, context, function (err, data) {
			expect(err.message).equal('No Game ID');
			done();
		});
	}));

	it('-- Fails when no Events are found', sinon.test(function(done) {

		app.handler(gameNoEvents, context, function (err, data) {
			expect(err.message).equal('No Events');
			done();
		});
	}));	
});


