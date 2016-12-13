declare function require(x: string): any;
var Sequelize = require('sequelize');

import {Database} from '../service/database';

export var Wether = Database.connection().define('wether', {
    date: {type: Sequelize.STRING, primaryKey: true},
    caption: {type: Sequelize.TEXT}
}, {
    timestamps: false,
    freezeTableName: true
});
