import { query } from "express";

export class PaginationDTO {

    constructor(
        public readonly page: number,
        public readonly limit: number,
        //public readonly query: any 
    ){}

    static create (page:number = 1, limit:number = 10):[string?, PaginationDTO?]{
        
        if(isNaN(page) || isNaN(limit)) return ['Page and limid much be a number'];
        if(page <= 0 || limit <= 0) return ['Page and limid much higher that 0']

        return [undefined, new PaginationDTO(page, limit)]
    }
}
        