import Admin from "../model/Schemas/adminSchema"
import jwt from 'jsonwebtoken'
import User from "../model/Schemas/userSchema"


const login = async(req,res)=>{
    console.log(req.body)
    let data = req.body
    let email = data.email
    
   let userData = await Admin.findOne({email})
      
       if(!userData){
            console.log('no user')
            res.json({status:false})
        }else{
            console.log('user',userData)
                if (userData.password ===data.password) {
 
                    const payload = {data:userData}
                    const secretKey = 'your-secret-key';

                    const token = jwt.sign(payload, secretKey);
                    console.log('Generated JWT:', token);
                    let response={}
                    response.token = token;
                    response.admin = userData
                    response.status = true;
                    res.json(response)


                }
                else {
                    res.json({ status: false })

                }
                       
        }
    

}

 const usersList = async(req,res)=>{
   const users =await User.find()
   console.log(users);
   res.json(users)
 }

 const adminData =async (req,res)=>{
    console.log(req.user,'user')
   const admin =await Admin.findById(req.user.data._id)
   res.json(admin)
 }

 const editUser =async(req,res)=>{
    try{
        console.log(req.body,'req body data')
        let data = req.body
        User.findByIdAndUpdate(data._id, data, { new: true })
        .then(updatedUser => {
          console.log('User updated:', updatedUser);
            res.json(updatedUser)
        })
        .catch(error => {
          console.error('Error updating user:', error);
          res.json(error)
        });

    }catch(err){
        console.log('error uploading the document',err)
        res.json(err)
    }
   
 }


 const deleteUser = (req,res)=>{
    let data = req.body
    console.log(data,'data')
    User.findByIdAndDelete(data._id).then((deletedUser)=>{
        if(deletedUser){
        console.log(deletedUser,'deleted user')
        res.json(deletedUser)
        }else{
            console.log('no user')
            res.json()
        }
    }).catch(err=>{
        console.log(err,'error')
        res.json(err)
    })
 }






export{
    login,
    usersList,
    adminData,
    editUser,
    deleteUser
}



