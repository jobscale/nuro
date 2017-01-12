var qs = require('qs');
var request = require('request').defaults({jar: true}); /* cookie jar use */

export class Session {

    session:any = {};

    constructor() {
    }

    login = (account, callback) => {
        this.session.jar = request.jar();
        var options = {
            method: 'POST',
            url: account.url,
            headers: account.headers,
            form: account.data,
            jar: this.session.jar,
            json: true
        };
        request.post(
            options,
            (error, response, body) => {
                this.session.error = error;
                if (!error && response.statusCode == 200) {
                    var parseBody = qs.parse(body);
                    this.session.response = response;
                    this.session.body = body;
                    this.session.parseBody = parseBody;
                } else {
                    console.warn(false, error, response, body);
                }
                callback(this.session);
            }
        );
    };

}