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
    res.end(archive.paths.list);
  }

};

