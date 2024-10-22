
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    
    eventType: {
        type: String,
        require: true
    },

    author: {
        type: String,
        require: true
    }    
})

export const EventModel = mongoose.model('Event', EventSchema)