import mongoose from 'mongoose'; 

const UserSchema = new mongoose.Schema ({
    
    name: {
        type: String,
        require: [true, 'User name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        require: [true, 'password is required']
    },
    age:{
        type: Number,
        default: 18,
    }
});

export const UserModel = mongoose.model('User', UserSchema);
   
    
