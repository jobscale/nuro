declare function require(x: string): any;
var client = require('../node_modules/cheerio-httpcli/index.js');
var env = require('../config/env.json');
var tables = require('../config/tables.json');
var Sequelize = require('sequelize');

export class Scraper {

    protected requestUrl = "http://www.tenki.jp/forecast/6/30/6200.html";

    construct() {
    }

    get = () => {
        client.fetch(this.requestUrl)
        .then((result) => {
            var $ = result.$;
            var title = $("title").text();
            var body = this.getBody($);
            console.log(title, body.html());
            this.store($);
        });
    };

    getBody = ($) => {
        return $("div#townLeftOneBox");
    };

    store = ($) => {
        // Connect to database
        var sequelize = new Sequelize(env.db.database, env.db.user, env.db.pass), dba;
console.log("data store");

        $.each(tables, (index, table) => {
            $.each(table.columns, (index, column) => {
                column = this.normalization(column);
            });
            // Define models
            dba = sequelize.define(table.tablename, table.columns);
        });
console.log(dba);

        // Create new instance
        var db = dba.build();
        console.log(db);

        // Set fields
        db.date = $("p.wethreDrtalIiconText:first").text();
        db.caption = $(".townTitleArea:first").text();

        // Save to database
        db.save().then((anotherTask) => {
            // you can now access the currently saved task with the variable anotherTask... nice!
            var self = anotherTask;
            // after succeeded...
            if (env.debug) {
                console.log('url: ', self.url);
                console.log('title: ', self.title);
            }
            }).catch((error) => {
            // Ooops, do some error-handling
            console.error(error);
        });
    };

    normalization = (column) => {
        if (column.type == "STRING") {
            column.type = Sequelize.STRING;
        } else if (column.type == "TEXT") {
            column.type = Sequelize.TEXT;
        }
        return column;
    };

}

