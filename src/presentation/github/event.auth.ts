
import { jwtAdapter } from "../../config";
import { CustomError } from "../../domain/custom.error";
import { PaginationDTO } from "../../domain/dtos/pagination.dto";
import { EventModel } from "./event.model";



export class EventService {


    public async validatedToken (token:string){
        const aut = await jwtAdapter.validateToken(token)
        return aut
        
    }
    public async getAll (paginationDTO: PaginationDTO){
        
        const {page, limit} = paginationDTO;
        
        try {
            const events = await EventModel.find()
            
            

            return events

        } catch (error) {
            console.log(error);
            
        }
    }

    public async getEventByEvent(eventType: String, paginationDTO: PaginationDTO){
        
        const {page, limit} = paginationDTO;
        
        try {
           const type = await EventModel.find({eventType:eventType})
            .skip((page -1 )* limit)
            .limit(limit)

            return type

        } catch (error) {
            console.log(error);
            
        }
    }

    public async deleteById(id: String){
        try {
            const event = await EventModel.findOne({_id:id})
            if(!event) throw CustomError.badRequest('event with that id doesnt exist')
    
            await EventModel.deleteOne({_id:id});
            
            return event

        } catch (error) {
            console.log(error);  
        }
    }
}