/* 
 * This file is part of the knowhow ERP, a free and open source 
 * Enterprise Resource Planning software suite,
 * Copyright (c) 2010-2011 by bring.out doo Sarajevo.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including knowhow-specific Exhibits)
 * is available in the file LICENSE_CPAL_bring.out_knowhow.md located at the 
 * root directory of this source code archive.
 * By using this software, you agree to be bound by its terms.
 */

// ## This is the starting point of a4-m3b server
// In this module we use express node module and work with sqlite database.
// This server export's many of methods for database manipulating.

var express = require('express');
var nmDbEngine = 'sqlite3';
var m3b_db = require('./m3b_db_' + nmDbEngine);
var util = require('util');

// Create express server
var app = express.createServer(
	// to do: express.logger();
);

// Configure a server
// It's important to use bodyParser() for POST methods and JSON object recognize.
// bodyParser() must be first in configuration list so it's first invoked.
app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}));
});

// Connect to database
m3b_db.connect( function(error) {
	if (error) throw error;
});

// On server close, close the databse connection too.
app.on('close', function(errno) {
	m3b_db.disconnect( function(errno) {});
});

// ## Exports:

// List of all articles
// Simply we can test connection by running this in console:
// 		curl http://localhost:8080/articles
// If it's ok, we must get the JSON object with article data

app.get('/articles', function(req, res, next) {
	m3b_db.getArticles(function(err, art_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( art_data );
		};
	});
});

// Get the article description by giving 'article_id'

app.get('/article_description/:article_id', function(req, res, next) {
	m3b_db.getArticleDescById( req.params.article_id, function(err, image_desc){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( image_desc );
		};
	});
});


// Get article image by giving 'article_id'
// We must get image represented in browser

app.get('/article_image/:article_id', function(req, res, next) {
	m3b_db.getArticleImageById( req.params.article_id, function(err, image_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'image/jpeg' });	
			res.end(image_data);
		};
	});
});


// Get all params for device by giving device_id

app.get('/params/:device_id', function(req, res, next) {
	m3b_db.getParamByDeviceId( req.params.device_id, function(err, par_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( par_data );
		};
	});
});


// Get list of all customers 

app.get('/customers', function(req, res, next) {
	m3b_db.getCustomers(function(err, cust_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( cust_data );
		};
	});
});

// Post customers data into test database 

app.post('/customers/update', function(req, res) {
	res.send(req.body);
	console.log(req.body);
	m3b_db.postCustomers(req.body, function(err, row){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			util.log('UPDATE customers OK');
		};
	});
});


// Get all purchases data 

app.get('/purchases', function(req, res, next) {
	m3b_db.getPurchases(function(err, p_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( p_data );
		};
	});
});


// Post purchases data into test sqlite database

app.post('/purchases/update', function(req, res) {
	
	res.send(req.body);
	
	var p_data;
	var p_items;

	for (var i=0; i < req.body.length; i++) {	
		
		p_data = req.body[i];

		m3b_db.postDocs(p_data, function(err, row){
			if (err) {
				util.log('ERROR ' + err);
				throw err;
			}
			else
			{
				util.log('UPDATE docs OK');
			};
		});
		
		m3b_db.deleteDocItems(p_data.doc_no, function(err){
			if (err) {
				util.log('ERROR ' + err);
				throw err;
			};			
		});

		for (var t=0; t < p_data.items.length; t++) {
			p_items = p_data.items[t];
			m3b_db.postDocItems(p_items, function(err, row){
				if (err) {
					util.log('ERROR ' + err);
					throw err;
				}
				else
				{
					util.log('UPDATE doc_items ' + p_items.doc_item_no);
				};
			});
		};	
	};
});



// Get list of all users

app.get('/users', function(req, res, next) {
	m3b_db.getUsers(function(err, u_data){
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		}
		else
		{
			res.send( u_data );
		};
	});
});

// server listen at port 8080
app.listen(8080);

