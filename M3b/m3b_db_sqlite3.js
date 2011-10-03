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

// ## Database module


var util = require('util');
var sqlite3 = require('sqlite3');

sqlite3.verbose();

var db = undefined;

// Connect to database
exports.connect = function(callback){
	db = new sqlite3.Database('m3b-test-db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
		if(err){
			utils.log('FAIL on creating database ' + err);
			callback(err);
		}
		else
		{
			callback(null);			
		};
	});
};

// Disconnect from database
exports.disconnect = function(callback) {
	callback(null);
};

// ## Exports

// ### Articles:

// Get all articles
exports.getArticles = function(callback) {
	util.log(' get all articles...');
	db.all('SELECT id, desc, price, image_name FROM articles', callback);
};


// get article row by id
exports.getArticleById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT id, desc, price, image_name FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article arr by id: ' + _id);
				callback(null, row);
				didOne = true;
			};
		};
	});
};

// get article row by id
exports.getArticleDescById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT desc FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article desc by id: ' + _id);
				callback(null, row['desc']);
				didOne = true;
			};
		};
	});
};

// get article image data by id
exports.getArticleImageById = function(_id, callback) {
	var didOne = false;
	db.each('SELECT image_data FROM articles WHERE id = ?', [ _id ], function(err, row) {
		if (err) {
			util.log('FAIL to retrieve row ' + err);
			callback(err, null);
		}
		else
		{
			if (!didOne) {
				util.log(' get article image data by id: ' + _id);
				callback(null, row['image_data']);
				didOne = true;
			};
		};
	});
};

// ### Params

// get params row by id
exports.getParamByDeviceId = function( _d_id, callback ) {
	util.log(' get all params...');
	db.all('SELECT * FROM params WHERE device_id = ? AND device_id = "*" ORDER BY id', [_d_id], callback);
};


// ### Customers

// Get all customers
exports.getCustomers = function(callback) {
	util.log(' get all customers...');
	db.all('SELECT * FROM customers ORDER BY id', callback);
};

// Post customers
exports.postCustomers = function(c_data, callback) {
	
	for (var i=0; i < c_data.length; i++) {
		db.run("INSERT OR REPLACE INTO customers (id, desc, city, postcode, addr, tel1, tel2, user_id, lon, lat) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
		[ Number(c_data[i].id), 
		c_data[i].desc, 
		c_data[i].city, 
		c_data[i].postcode, 
		c_data[i].addr, 
		c_data[i].tel1, 
		c_data[i].tel2, 
		Number(c_data[i].user_id), 
		Number(c_data[i].lon), 
		Number(c_data[i].lat) ], 
		function(err){
			if (err) {
	  			util.log("FAILED on updating table " + err);
	  			callback(err);
	  		}
	  		else
	  		{
	  			callback(null);
	  		};
	  	
	  	}); 
	};
};


// ### Purchases

// Get purchases
exports.getDocs = function(callback) {
	util.log(' get all purchases...');
	db.all('SELECT * FROM docs ORDER BY doc_no', callback);
};

// Post purchase documents
exports.postDocs = function(p_data, callback) {
	
	db.run("INSERT OR REPLACE INTO docs (doc_no, doc_date, cust_id, doc_valid, items_total, doc_notes, user_id) VALUES(?, ?, ?, ?, ?, ?, ?)", 
		[ Number(p_data.doc_no), 
		p_data.doc_date, 
		p_data.cust_id,
		p_data.doc_valid,
		p_data.items_total,
		p_data.doc_notes,
		p_data.user_id ], 
		function(err){
			if (err) {
	  			util.log("FAILED on updating table docs" + err);
	  			callback(err);
	  		}
			else
			{
				callback(null);
			};
	  	});
};


// Post purchase items data
exports.postDocItems = function(p_items, callback) {
	
	db.run("INSERT OR REPLACE INTO doc_items (doc_no, doc_item_no, article_id, article_quantity) VALUES(?, ?, ?, ?)", 
		[ Number(p_items.doc_no), 
		p_items.doc_item_no, 
		p_items.article_id,
		p_items.article_quantity ], 
		function(err){
			if (err) {
	  			util.log("FAILED on updating table doc_items" + err);
	  			callback(err);
	  		}
			else
			{
				callback(null);
			};
	  	});
};

// Delete purchase items data
exports.deleteDocItems = function(doc_no, callback) {
	
	db.run("DELETE FROM doc_items WHERE doc_no = ?", 
		[ Number(doc_no) ], 
		function(err){
			if (err) {
	  			util.log("FAILED on deleting table doc_items" + err);
	  			callback(err);
	  		}
			else
			{
				callback(null);
			};
	  	});
};


// ### Users

// Get all users
exports.getUsers = function(callback) {
	util.log(' get all users...');
	db.all('SELECT * FROM users ORDER BY id', callback);
};

