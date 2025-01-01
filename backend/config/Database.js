import { Sequelize } from "sequelize";

const db = new Sequelize('attendance_db', 'root', 'password', {
    host: 'mysql-container',
    dialect: 'mysql',
    port: 3306
});

export default db;