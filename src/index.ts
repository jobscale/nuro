import {Scraper} from './app/scraper';
declare function require(x: string): any;
var request = require('request');
/* cookie jar */
request = request.defaults({jar: true});
var qs = require('qs');

var test = () => {
    var url = 'https://dashboard.tapjoy.com/api/client/v1/session';
    var headers = {
        'Content-Type':'application/json'
    };
    var data = {
        username: 's.okutani@nttsolmare.com',
        password: 'Solmare!',
        _method: "put"
    };
    var options = {
        url: url,
        method: 'POST',
        headers: headers,
        json: true,
        form: data
    };
    request.post(
        options,
        function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var parse_body = qs.parse(body);
                console.log(true, res, body, parse_body);
            } else {
                console.log(false, err, res, body);
            }
        }
    );
};

(() => {
    test();

    /*var sc = new Scraper;
    sc.get();*/
})();
