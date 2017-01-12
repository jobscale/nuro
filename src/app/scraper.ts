var client = require('cheerio-httpcli');
var env = require('../../config/env.json');
var _ = require('underscore');

import {Wether} from '../model/wether';

export class Scraper {

    protected requestUrl = "http://www.tenki.jp/forecast/6/30/6200.html";

    construct() {
    }

    get = () => {
        client.fetch(this.requestUrl)
        .then((result) => {
            var $:any = result.$;
            var title = $("title").text();
            var body = this.getBody($);
            console.log(title, body.html());
            var data = this.getData($);
            this.store(data);
        });
    };

    getBody = ($) => {
        return $("div#townLeftOneBox");
    };

    getData = ($) => {
        return {
            date: $(".townTitleArea").first().text(),
            caption: $("p.wethreDrtalIiconText").first().text()
        };
    };

    store = (data) => {

        // Create new instance
        var model = Wether.build({
            date: data.date,
            caption: data.caption
        });

        // Save to database
        model.save().then((anotherTask) => {
            // you can now access the currently saved task with the variable anotherTask... nice!
            var self = anotherTask;
            // after succeeded...
            if (env.debug) {
                console.log('succeeded: ', self);
            }
            }).catch((error) => {
            // Ooops, do some error-handling
            console.error(error);
        });
    };

}

