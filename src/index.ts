import {Session} from "./service/session";
import {Scraper} from "./app/scraper";
var env = require('../config/env.json');

(() => {
    var scraper = ($) => {
        var scraper = new Scraper;
        scraper.render($);
    };
    var session = new Session;
    session.login(env.account, scraper);
})();
