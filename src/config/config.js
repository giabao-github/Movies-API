import dotenv from 'dotenv';
dotenv.config();

export default {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    userName: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
}