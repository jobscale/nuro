var client = require('cheerio-httpcli');

var word = 'node.js';
client.fetch('http://www.google.com/search', { q: word })
.then(function (result) {
    var $ = result.$;
    console.log(result.response.headers);
    console.log($('title').text());
    $('a').each(function (idx, element) {
        console.log($(element).attr('href'));
    });
});
