

export class LoginUserDto {

    constructor (
        public email: string,
        public password: string,

    ){}

        static create ({email, password}:{email:string, password:string}):[string ?, LoginUserDto?]{

            if(!email) return ['email is mandatory',undefined];
            if(!password) return ['Password is mandatory', undefined];

            return[undefined, new LoginUserDto(email, password)]
        }
}