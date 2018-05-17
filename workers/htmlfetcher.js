// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

exports.run = function() {
  archive.readListOfUrls(function (urlsArray) {
    archive.downloadUrls(urlsArray);
  });
};

this.run();