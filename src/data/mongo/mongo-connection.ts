import { env } from "process";
const mongoose = require('mongoose');


export class MongoDataBase {

    static async connect(){

        try {
            await mongoose.connect(env.MONGO_URL, {
                dbname: env.MONGO_DB_NAME,
                pass:env.MONGO_PASS,
                user:env.MONGO_USER
                });
            console.log('Mongo connection');
            
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}



