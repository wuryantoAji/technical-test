import { Sequelize } from "sequelize";

const db = new Sequelize('attendance_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default db;