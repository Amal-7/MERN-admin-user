import User from "../model/Schemas/userSchema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSignup =async(req,res)=>{
    console.log(req.body);
    req.body.password =await bcrypt.hash(req.body.password, 10)
    const newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        number:req.body.number,
        imageUrl:''
 
    })

    newUser.save()
        .then(savedUser => {
            console.log('Saved user:', savedUser);
            const payload = {data:savedUser}
                const secretKey = 'your-secret-key';

                const token = jwt.sign(payload, secretKey);
                console.log('newly created token',token)
            res.json({savedUser,token})
        })
        .catch(error => {
            res.json(error)
            console.error('Error saving user:', error);
        });
    
}

const userLogin = async(req,res)=>{
    console.log(req.body)
    let data = req.body
    let email = data.email
   let userData = await User.findOne({email})
      
       if(!userData){
            console.log('no user')
            res.json({status:false})
        }else{
            console.log('user und',userData)
            bcrypt.compare(data.password,userData.password).then((status)=>{
                if (status) {
 
                    const payload = {data:userData}
                    const secretKey = 'your-secret-key';

                    const token = jwt.sign(payload, secretKey);
                    console.log('Generated JWT:', token);
                    let response={}
                    response.token = token;
                    response.user = userData
                    response.status = true;
                    res.json(response)


                }
                else {
                    res.json({ status: false })

                }
            })            
        }
    
   
} 

const profileDetails = async(req,res)=>{
    console.log(req.user,'user')
   const user =await User.findById(req.user.data._id)
   res.json(user)
}

const updloadImage =async (req,res)=>{
    const url = req.body.url
    const email = req.body.user.email
          User.updateOne({email},{
            $set:{
                imageUrl:url
            }
          }).then((res)=>{
            console.log(res)
            res.json({status:true})

          }).catch((err)=>{
            console.log(err);
            res.json({status:false})
          })
}



export {
    UserSignup, 
    userLogin,
    profileDetails,
    updloadImage
}