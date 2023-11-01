import pkg from 'pg';
import dotenv from 'dotenv';

// dotenv.config()

// const user = process.env.POSTGREUSER;
// const host = process.env.POSTGREHOST;
// const database = process.env.POSTGREDB;
// const password = process.env.POSTGREPASSWORD;
// const port = process.env.POSTGREPORT;
//
// const { Pool } = pkg;
//
// const pool = new Pool({
//     user: user,
//     host: host,
//     database: database,
//     password: password,
//     port: port,
// });

import mongoose from "mongoose";

const connectDB = (url)=>{
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });
}


// export default pool
export default connectDB