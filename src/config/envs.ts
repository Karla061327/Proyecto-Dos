
import 'dotenv/config';
import {get} from 'env-var';
 
//porque tengo que declarar las variiables
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
}