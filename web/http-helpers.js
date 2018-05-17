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
  fs.readFile(indexHtmlFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    res.writeHead(200, this.headers);
    res.end(data);
    return;
  });
};

// Serve the actual archived assets of the site in question
exports.serveArchive = function(url, res) { 
  var urlHtmlFile = archive.paths.archivedSites + '/' + url;
  fs.readFile(urlHtmlFile, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.writeHead(200, this.headers);
    res.end(data);
    return;
  });
};

// As you progress, keep thinking about what helper functions you can put here!


// Serve the loading.html file
exports.serveLoadingPage = function(res) {
  var indexHtmlFile = archive.paths.siteAssets + '/loading.html';
  fs.readFile(indexHtmlFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    res.writeHead(200, this.headers);
    res.end(data);
    return;
  });
};

// Serve the 404.html file
exports.serveFileNotFoundPage = function(res) {
  var indexHtmlFile = archive.paths.siteAssets + '/404.html';
  fs.readFile(indexHtmlFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    res.writeHead(404, this.headers);
    res.end(data);
    return;
  });
};