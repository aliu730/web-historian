var path = require('path');
var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  if (parsedUrl.path === '/') {
    httpHelpers.serveIndex(res);
  } else {
    if (req.method === 'GET') {
      var siteUrl = parsedUrl.path.slice(1);
      archive.isUrlArchived(siteUrl, function(existsInArchive, url) {
        // if exists is true
        //   serve the archive
        // if exists is not true
        //   check the list in sites.txt
        //     if the site is present, serve loading page
        //     if not, add the URL to the list, then serve the loading page 
        if (existsInArchive) {
          httpHelpers.serveArchive(url, res);
        } else {
          archive.isUrlInList(url, function(existsInList) {
            if (existsInList) {
              httpHelpers.serveLoadingPage(res);
            } else {
              archive.addUrlToList(url, function() {
                httpHelpers.serveLoadingPage(res);
              });
            }
          });
        }
      });
    }
    
  }
   
};

