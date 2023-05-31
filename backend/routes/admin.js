import express from 'express'
import { adminData, deleteUser, editUser, login, usersList } from '../controller/adminController';
import verifyToken from '../jwt/verifyToken';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',login)
router.get('/userList',usersList)
router.get('/profile',verifyToken,adminData)
router.route('/user')
  .put(editUser)
  .post(deleteUser)



export default router
