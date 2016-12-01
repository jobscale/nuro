declare function require(x: string): any;
var client = require('../node_modules/cheerio-httpcli/index.js');

export class Scraper {

    construct() {
    }

    get = () => {
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
    };

}

