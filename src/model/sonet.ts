var Sequelize = require('sequelize');

import {Database} from '../service/database';

export var Sonet = Database.connection().define('sonet', {
    date: {type: Sequelize.STRING, primaryKey: true},
    caption: {type: Sequelize.TEXT}
}, {
    timestamps: false,
    freezeTableName: true
});

/*
CREATE TABLE `sonet` (
  `date` varchar(26) NOT NULL,
  `caption` text,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

