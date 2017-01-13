declare function require(x: string): any;
var nodemailer = require('nodemailer');
var env = require('../../config/env.json');
var _ = require('underscore');

export class Mailer {

    protected trans;

    constructor() {
        this.trans = nodemailer.createTransport(env.mail);
    }

    send = (data) => {
        var mailOptions = _.extend({}, env.mailOptions, data);
        this.trans.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

}