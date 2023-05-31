

import mongoose from 'mongoose';

const connection = async()=>{

  await mongoose.connect('mongodb+srv://amalta1997:cristiano7@tacloth.x8eq5ou.mongodb.net/userAdmin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')) 
.catch((err) => console.log(err));  

}



export default connection; 
