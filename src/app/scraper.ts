var env = require('../../config/env.json');
var _ = require('underscore');

import {Sonet} from '../model/sonet';
import {Mailer} from "../service/mailer";

export class Scraper {

    construct() {
    }

    render = ($) => {
        var data = this.getData($);
        this.mail(data);
        this.store(data);
    };

    getBody = ($) => {
        return $("div.guideSignElem");
    };

    getData = ($) => {
        return {
            title: $("title").text(),
            body: this.getBody($),
            date: (new Date).toString(),
            caption: $("div.guideSignElem dd").first().text().replace(/[\s]/g, '')
        };
    };

    mail = (data) => {
        (new Mailer).send({
            subject: data.title,
            html: data.body.html()
        });
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

