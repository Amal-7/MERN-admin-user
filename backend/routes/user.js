import express from 'express'
import { UserSignup,profileDetails,updloadImage,userLogin } from '../controller/userController';
import verifyToken from '../jwt/verifyToken';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hy')
});
 
router.post('/signup',UserSignup)
router.post('/login',userLogin)
router.get('/profile',verifyToken,profileDetails)
router.post('/upload',updloadImage)
 
export default router
