import { CustomError } from "../../domain/custom.error";
import { UserRegisterDto } from "../../domain/dtos/auth/user-register.dto";
import { UserModel } from "../../data/mongo/user.model.mongo";
import { SendEmailValidated } from "./send.email.validated";

export class ServiceAuth {

    constructor(
    ){}

    public async registerEmailValidated (userRegisterDto:UserRegisterDto){
        
        try {
            const email = await UserModel.findOne({email: userRegisterDto.email})
            if(email) throw CustomError.badRequest('Email already exist')  

            const newUser = await UserModel.create(userRegisterDto)
            newUser.save()
            
            await  SendEmailValidated.sendValidated(newUser.email!)

        } catch (error) {
            console.log(error);
            
        }
    }
}
