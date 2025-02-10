import { CustomError } from "../../domain/custom.error";
import { UserRegisterDto, LoginUserDto } from "../../domain/dtos/auth/index";
import { UserModel } from "../../data/mongo/user.model.mongo";
import { bcryptAdapter, envs,jwtAdapter } from "../../config";
import { EmailService } from "../service/email.service";

export class ServiceAuth {

    // constructor(
       
    // ){}

    public async registerUser (userRegisterDto:UserRegisterDto){

            const email = await UserModel.findOne({email: userRegisterDto.email})
        
            if(email) throw CustomError.badRequest('Email already exist')

            const newUser = await UserModel.create(userRegisterDto)
            //hash de la contraseña
            newUser.password = bcryptAdapter.hash(userRegisterDto.password)
            newUser.save()

            this.sendValidated(newUser.email!)
      
    }

    public async loginUser (loginUserDto: LoginUserDto ){

        const user = await UserModel.findOne({email:loginUserDto.email});
        console.log(loginUserDto);
        
        if (!user) throw CustomError.badRequest('Email already not exist')

        if(!user.emailValidated) throw CustomError.badRequest('You much validated your email first');

        const match = bcryptAdapter.compare( loginUserDto?.password, user.password!,)
        if (!match) throw CustomError.badRequest('invalid credencials')
        
        const token = await jwtAdapter.generateToken({id: user.id, email: user.email})
        if(!token) throw CustomError.internalServer('Error while creating JWT'); 

        return {
            user: {name: user.name,
                    email: user.email
                },
            token: token
        }
    }
    
    public sendValidated = async (email: string) => {
        
        //TODO no entiendo el que necesite el email
        //generar token,
        const token = await jwtAdapter.generateToken({email})    
        //await jwtAdapter.generateToken({id: user.id})
    
        const link = `${envs.WEBSERVICE_URL}/email-validate:TOKEN:${token}`;

        const html = `<h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href= "${link}">Validate your email: ${email}</a> `

        const sendEmail = new EmailService()
        sendEmail.sendEmail({
            to: email,
            subject: 'Validated e-mail',
            htmlBody: html
        })
        if (!sendEmail) throw CustomError.internalServer('Error sending email');

        return true;
    }    
    
    public validateTokenEmail = async (token: string) => {
        
        const data = await jwtAdapter.validateToken(token)
        if (!data) throw CustomError.unauthorized('Invalid token');

        const {email} = data as {email:string};
        if(!email) throw CustomError.internalServer('Email not in token');
        
        const user = await UserModel.findOne({email: email});
        if (!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        user.save();

        return true
    }
}           

