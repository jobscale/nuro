declare function require(x: string): any;
var env = require('../../config/env.json');
var Sequelize = require('sequelize');

export class Database {

    protected static sequelize;

    static connection = () => {
        if (Database.sequelize) {
            return Database.sequelize;
        }
        Database.sequelize = new Sequelize({
            host: env.db.host,
            port: env.db.port,
            database: env.db.database,
            username: env.db.user,
            password: env.db.pass
        });
        return Database.sequelize;
    };

}

