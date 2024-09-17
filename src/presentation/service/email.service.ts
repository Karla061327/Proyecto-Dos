import nodemailer from "nodemailer";
import { env } from "process";

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody?: string;
    //TODO attachment
}

 export class EmailService {

    //el objeto que envia el correo
     private transporter = nodemailer.createTransport({
       service: env.MAILER_SERVICE,
       auth: {
        user: env.MAILER_EMAIL,
        pass: env.MAILER_SECRET_KEY
       }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;
        try {
            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            });
            
            return true;

        } catch (error) {
            return false
        }
    }
};

