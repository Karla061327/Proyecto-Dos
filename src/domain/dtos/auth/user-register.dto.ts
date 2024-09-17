import { regularExps } from "../../../config/regular-exp";


export class UserRegisterDto {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public age?: number, 
    ){}

        static create({name, email , password, age}:{name:string, email:string , password:string, age?:number}): [string?,UserRegisterDto?]{
        
        if(!name) return ['Missing name', undefined];
        if(!email) return ['Missing email', undefined];
        if(age && age <= 18) return ['Age mush be a number and over 18', undefined];
        if(!regularExps.email.test(email)) return ['invalid email', undefined];
        if(!password) return ['Missing passsword', undefined];
        if(password.length < 6) return ['Password too short', undefined];
    
        return [undefined, new UserRegisterDto(name, email, password, age)]
    }
} 