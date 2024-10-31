import { Request, Response } from "express";
import { CustomError } from "../../domain/custom.error";
import { UserModel } from "../../data/mongo/user.model.mongo";
import { ServiceAuth } from "./index";
import { LoginUserDto, UserRegisterDto} from "../../domain/dtos/auth";
import { json } from "stream/consumers";

export class AuthController {

    constructor(
        private readonly serviceAuth:ServiceAuth,
       // private readonly emailService:EmailService
    ){}

    registerUserAuth = async (req:Request, res: Response) => {
        try {

            const [error, registerDto] = await UserRegisterDto.create(req.body);
            if(error) return res.status(400).json({error})
            
            // guardar usuario
            await this.serviceAuth.registerUser(registerDto!)
            return res.status(201).json(registerDto);

            //enviar email 

        } catch(err){
            res.status(400).json((err as Error).message)
        }
    }

   loginUserAuth = async (req:Request, res: Response) => {
        
        
        const [error, loginDto]  = await LoginUserDto.create(req.body);   
        if(error) return res.status(401).json(error);

        try {
            await this.serviceAuth.loginUser(loginDto!)
            res.status(200).json('Success log')

        } catch (error) {
            res.status(400).json((error as Error).message);
        }
       
        
    }
    
    reSendEmail = async (req:Request, res: Response) => {

        try {
            
            if (!req.body.email) throw CustomError.badRequest('Email is required');

            const userMongo = await UserModel.findOne({email:req.body.email});
            if (!userMongo?.email) throw CustomError.badRequest('You must register first');

            await this.serviceAuth.sendValidated(userMongo.email)       
            res.status(200).json('Email enviado')

        } catch (error) {
            res.status(400).json(error)
        }
    }

    emailValidate = (req:Request, res: Response) => {
        const {token} = req.params;

        try {
            this.serviceAuth.validateTokenEmail(token)
            res.status(200).json('Token validated')
        } catch (error) {
            res.status(400).json('Token not validated')
        }
    

    }
}