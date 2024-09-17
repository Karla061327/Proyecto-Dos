
import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { AuthController } from './presentation/auth/controller';
import { MongoDataBase } from './data/mongo/mongo-connection';
import { EmailService } from './presentation/service/email.service';
import { ServiceAuth } from './presentation/auth/user-auth-reg';

// {"name":"karla",
//     "email": "kp.marin10@gmail.com",
//     "password":"1234567"
//     }

(async()=> {
    main();
})();

async function main (){

    //coneccion de mongo
    await MongoDataBase.connect()

    //crear aplicacion express
    const app = express();

    //controla los eventos de Guthub
    const controller = new GithubController();
    const serviceAuth = new ServiceAuth()
    //controla la interaccion de usuario
    const controllerAuth = new AuthController(serviceAuth);

    app.use(express.json());
    
    //crear rutas
    app.post('/github', controller.WebhookeHandler)

    app.post('/register', controllerAuth.registerUserAuth)
    
    app.post('/resend', controllerAuth.reSendEmail)
    // app.post('/login', (req, res) => {
    //     res.json('Endpoint login')
    // })
    // app.post('/save', (req, res) => {
    //     res.json('Endpoint saveEvent')
    // })
    // app.get('/all', (req, res) => {
    //     res.json('Endpoint get all events')
    // })
  
    //Inicio servidor 
    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`);
        
    });


    

}