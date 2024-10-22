
import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { AuthController } from './presentation/auth/controller';
import { MongoDataBase } from './data/mongo/mongo-connection';
import { ServiceAuth } from './presentation/auth/user.auth';
import { EventService } from './presentation/github/event.auth';

// {"name":"karla",
//     "email": "kp.marin10@gmail.com",
//     "password":"1234567"
//     }
//validar tokeb, pagincion, resto de eventos, filtro
(async()=> {
    main();
})();

async function main (){

    //coneccion de mongo
    await MongoDataBase.connect()

    //crear aplicacion express
    const app = express();
    
    const eventService = new EventService();
    //controla los eventos de Guthub
    const controller = new GithubController(eventService);

    const serviceAuth = new ServiceAuth();
    //controla la interaccion de usuario
    const controllerAuth = new AuthController(serviceAuth);

    app.use(express.json());

    //USER
    app.post('/register', controllerAuth.registerUserAuth);  
    app.post('/resend', controllerAuth.reSendEmail);
    app.post('/login', controllerAuth.loginUserAuth);
    app.get('/email-validate/:token', controllerAuth.emailValidate);

    //EVENTS  
    app.post('/github', controller.WebhookeHandler);
    app.get('/get-all', controller.GetAllEvents);
    app.delete('/delete/:id', controller.DeleteById);
    app.get('/get-byEvent/:event', controller.GetByEvent)

    //Inicio servidor 
    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`);
        
    });
}