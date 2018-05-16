var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

// Serve the basic index.html file which contains our form
exports.serveIndex = function(res) {
  var indexHtmlFile = archive.paths.siteAssets + '/index.html';
  fs.readFile(indexHtmlFile, function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    
    res.end(data);
    return;
  });
};

// Serve the loading.html file
exports.serveLoading = function() {
  
};

// Serve the actual archived assets of the site in question
exports.serveArchive = function() {
  
};

// As you progress, keep thinking about what helper functions you can put here!
