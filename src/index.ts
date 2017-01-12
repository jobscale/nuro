import {Session} from "./service/session";
var env = require('../config/env.json');

(() => {
    var scraper = (session) => {
        console.log('session', session);
    };
    var session = new Session;
    session.login(env.account, scraper);
})();
