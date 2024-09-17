
import { EmailService } from "../service/email.service";


//esta funcion se ecarga de enviar correos con la validacion!
export class SendEmailValidated {

    constructor(
    ){}

    static async sendValidated (email: string) {

        //TODO link de autentificacio
        
        const sendEmailAgain = new EmailService()
        sendEmailAgain.sendEmail({
            to: email,
            subject: 'Validated e-mail'
        })
    }    

}
        
    