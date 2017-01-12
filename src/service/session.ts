var client = require('cheerio-httpcli');

export class Session {

    constructor() {
    }

    login = (account, callback) => {
        client.fetch(account.url)
        .then((result) => {
            var $:any = result.$;
            return $('form[name=Login]').submit(account.data);
        })
        .then((result) => {
            var $:any = result.$;
            return $('#menuUseCondition').click({});
        })
        .then((result) => {
            var $:any = result.$;
            callback($);
        })
        .catch((error) => {
            console.warn(error);
        });
    };

}