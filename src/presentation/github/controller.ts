import { Request, Response } from "express";


export class GithubController {

    constructor(

    ){}

    WebhookeHandler = (req: Request, res: Response ) => {
        const payload = req.body;
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        console.log({githubEvent});
        
        //console.log(JSON.stringify(payload));

        res.status(202).send('accepted');
    }
} 