import {Session} from "./service/session";
import {Scraper} from "./app/scraper";
var env = require('../config/env.json');

(() => {
    var scraper = (session) => {
        var scraper = new Scraper;
        scraper.render(session);
    };
    var session = new Session;
    session.login(env.account, scraper);
})();
