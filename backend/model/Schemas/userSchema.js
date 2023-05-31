import {Schema,model} from 'mongoose';

const UserSchema = new Schema({
    name : String,
    email: {
        type: String,
        required: true,
        unique: true
      },
    password:String,
    number: Number,
    imageUrl:String
})

const User = model('Users',UserSchema);

export default User;