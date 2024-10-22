
import jwt from "jsonwebtoken";
import { envs } from './envs'

export class jwtAdapter{

    static async generateToken(payload: any, duration:string = '72h'){
        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, {expiresIn: duration}, (err, token)=>{
                
                if(err) return resolve(null);
                resolve(token)
            });
        })
    }
    static validateToken(token: string) {
    
        return new Promise( (resolve) => {
          jwt.verify( token, envs.JWT_SEED, (err, decoded) => {
            
            if( err ) return resolve(null);
            resolve(decoded);
    
          });
        })
      }
} 