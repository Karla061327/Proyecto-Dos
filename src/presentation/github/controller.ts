import { Request, Response } from "express";
import { EventService } from "./event.auth";
import { EventModel } from "./event.model";
import { CustomError } from "../../domain/custom.error";
import { PaginationDTO } from "../../domain/dtos/pagination.dto";

export class GithubController {

    constructor(
        private readonly eventService:EventService
    ){}
    //extraer los datos, guardar datos 
    WebhookeHandler = async (req: Request, res: Response ) => {
        
        try {
            const payload = req.body.repository;
          
            const githubEvent = req.header('x-github-event') ?? 'unknown';
            const newEvent = await EventModel.create({author: payload.full_name, id: payload.id, eventType: githubEvent, date: payload.created_at});

            newEvent.save()

            res.status(202).send('accepted');
        } catch (error) {
            res.status(400).json(error)
        }     
    }

    GetAllEvents = async (req: Request, res:Response) => {

        const {page=1, limit=10, query=""} = req.query;
        const [error, paginationDTO] = PaginationDTO.create(+page, +limit)
        if (error) return res.status(410).json({error});
        
        try {
            const token = req.headers.token;

            if (!token || typeof token !== 'string') throw CustomError.badRequest('Token is mandatory');

            const validated = await this.eventService.validatedToken(token!);

            if (validated === null) throw CustomError.badRequest('invalid Token')
            const events = await this.eventService.getAll(paginationDTO!);
            res.status(202).json(events)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    GetByEvent = async(req: Request, res: Response) => {

        const {token} = req.params;
        const {page=1, limit=10, query=""} = req.query;
        const [error, paginationDTO] = PaginationDTO.create(+page, +limit)

        if (error) return res.status(410).json({error});

        try {
            const event = req.params.event
            const events = await this.eventService.getEventByEvent(event, paginationDTO!)

            res.status(200).json(events)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    DeleteById = async (req:Request, res:Response) => {

        try {

            const id = req.params.id;
            await this.eventService.deleteById(id)

            res.status(200).json('the event has been delete' )

        } catch (error) {
            res.status(400).json(error)
        }
    }
} 