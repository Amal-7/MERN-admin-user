
const secretKey = 'your-secret-key';
import  jwt  from "jsonwebtoken";


export default function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token' ,token)

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(401); // Unauthorized
        }

        req.user = decoded; // Store decoded user information for later use
        next();
    });
}
  
  