var path = require('path');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);

  if (parsedUrl.path === '/') {

    if (req.method === 'POST') {

      var body = '';
      req.on('data', function(data) {
        body += data;
      });

      req.on('end', function() {

        var post = qs.parse(body);
        var siteUrl = post['url'];
        //console.log(siteUrl);

        // if post method
        // check if url is contained in sites.txt
        archive.isUrlInList(siteUrl, function(existsInList) {
          // if not inside
          if (!existsInList) {
            // write to file inside the sites.text the url

            archive.addUrlToList(siteUrl, function() {
              // show loading
              res.statusCode = 302;
              httpHelpers.serveLoadingPage(res);
            });
          // if so do nothing
          } else {
            // show loading
            httpHelpers.serveLoadingPage(res);
          }
        });

      });

    } else {
      httpHelpers.serveIndex(res);
    }

  } else {

    var siteUrl = parsedUrl.path.slice(1);

    if (req.method === 'GET') {
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
              httpHelpers.serveFileNotFoundPage(res);
            }
          });
        }
      });
    }
  }
};

