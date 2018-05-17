var fs = require('fs');
var path = require('path');
var http = require('http');
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
    urlsArray = urlsArray.filter( url => url.length );

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
  
  // moar callback hell
  this.readListOfUrls( (urlsArray) => {
    //console.log(url);
    if (urlsArray.indexOf(url) === -1) {
      urlsArray.push(url);
    }
    var urlsString = urlsArray.join('\n');
    urlsString += '\n'; // Always ensure that we have a newline at the end of the list...
    
    fs.writeFile(this.paths.list, urlsString, 'utf8', function(err) {
      if (err) {
        console.log(err);
        return;
      }
      callback();
    });
  });
  
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(this.paths.archivedSites + '/' + url, function(exists) {
    callback(exists, url);
  });
};

exports.downloadUrls = function(urls) {
  //loop through urls
  //check if they are already archived
  //if not then we download to our path

  var callback = (urlExists, url) => {
    if (urlExists) {
      return;
    }
    
    var file = fs.createWriteStream(this.paths.archivedSites + '/' + url);
    http.get('http://' + url, function(res) {
      res.pipe(file);
      file.on('finish', function () {
        file.close();
      });
    });
    
  };
  for (var i = 0; i < urls.length; i++) {
    this.isUrlArchived(urls[i], callback);
  }
};
