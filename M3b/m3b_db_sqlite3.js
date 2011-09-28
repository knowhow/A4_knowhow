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

var util = require('util');
var sqlite3 = require('sqlite3');

sqlite3.verbose();

var db = undefined;

// connect db
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

// disconnect db
exports.disconnect = function(callback) {
	callback(null);
};

// ## Articles

// get articles
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

// ## get params

// get params row by id
exports.getParamByDeviceId = function( _d_id, callback ) {
	util.log(' get all params...');
	db.all('SELECT * FROM params WHERE device_id = ? ORDER BY id', [_d_id], callback);
};


// ## Customers

// get customers
exports.getCustomers = function(callback) {
	util.log(' get all customers...');
	db.all('SELECT * FROM customers ORDER BY id', callback);
};

// put customers
exports.putCustomers = function(c_data, callback) {
	for (var i=0; i < c_data.length; i++) {
		db.run("UPDATE customers SET desc = ?, city = ?, postcode = ?, addr = ?, lon = ?, lat = ? WHERE id = ?", [ c_data[i].desc, c_data[i].city, c_data[i].postcode, c_data[i].addr, c_data[i].lon, c_data[i].lat ], function(err){
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



// ## Users

// get users
exports.getUsers = function(callback) {
	util.log(' get all users...');
	db.all('SELECT * FROM users ORDER BY id', callback);
};

