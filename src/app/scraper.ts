var env = require('../../config/env.json');
var _ = require('underscore');

import {Sonet} from '../model/sonet';
import {Mailer} from "../service/mailer";

export class Scraper {

    construct() {
    }

    render = ($) => {
        var title = $("title").text();
        var body = this.getBody($);
        (new Mailer).send({
            subject: title,
            html: body.html()
        });
        var data = this.getData($);
        this.store(data);
    };

    getBody = ($) => {
        return $("div.guideSignElem");
    };

    getData = ($) => {
        return {
            date: $("div.guideSignElem dd").first().text(),
            caption: $("div.guideSignElem dt").first().text()
        };
    };

    store = (data) => {

        // Create new instance
        var model = Sonet.build({
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

