import { Request, Response } from "express";
import { UserRegisterDto } from "../../domain/dtos/auth/user-register.dto";
import { ServiceAuth } from "./user-auth-reg";
import { CustomError } from "../../domain/custom.error";
import { UserModel } from "../../data/mongo/user.model.mongo";
import { SendEmailValidated } from "./send.email.validated";


export class AuthController{
    [x: string]: any;

    constructor(
        private readonly serviceAuth:ServiceAuth,
       // private readonly emailService:EmailService
    ){}

    registerUserAuth = async (req:Request, res: Response) => {
        try {

            const [error, registerDto] = await UserRegisterDto.create(req.body);
            if(error)return res.status(400).json({error})
            
            // guardar usuario
            this.serviceAuth.registerEmailValidated(registerDto!)
            return res.status(201).json(registerDto);

        } catch(err){
            res.status(400).json(err)
        }
    }
    
    reSendEmail = async (req:Request, res: Response) => {


        try {
            if (!req.body.email) throw CustomError.badRequest('Email is required')

            const userMongo = await UserModel.findOne({email:req.body.email})
            if (!userMongo?.email) throw CustomError.badRequest('You must register first')

            await SendEmailValidated.sendValidated(userMongo.email)          
            res.status(200)

        } catch (error) {
            res.status(400).json(error)
        }
          
      
    }
}