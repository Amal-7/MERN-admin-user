import {Schema,model} from 'mongoose';

const AdminSchema = new Schema({
    name : String,
    email: {
        type: String,
        required: true,
        unique: true
      },
    password:String,
    
})

const Admin = model('admins',AdminSchema);

export default Admin;