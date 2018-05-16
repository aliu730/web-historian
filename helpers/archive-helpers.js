var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readListOfUrls = function(callback) { //returns a Array of urls
  fs.readFile(this.paths.list, 'utf8', function(err, data) { //reads the urls in the textfile at paths.list
    if (err) { //maybe wrong path
      console.error(err);
      return;
    } // else this is data and we split by new line.
    var urlsArray = data.split('\n'); //call back was in test and had the expect tester 
    callback(urlsArray); //pass call back on the urls we split.
  });
};

exports.isUrlInList = function(url, callback) { //returns a boolean
  // now entering callback hell
  this.readListOfUrls(function(urlsArray) {
    var urlInList = false;
    if (urlsArray.indexOf(url) !== -1) {
      urlInList = true;
    }
    callback(urlInList);
  });
  
};

exports.addUrlToList = function(url, callback) { 
  
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
