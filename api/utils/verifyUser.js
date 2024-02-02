import jwt from 'jsonwebtoken'
import {errorHandler} from '../utils/error.js'


export const verifyToken = (req,res,next)=>{
    const token = req.cookie.access_token;
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token, 'wbswbdjbfqjwdfhjhebvjefvbkqebfvkje',(err,user)=>{
        if(err){
            return next(errorHandler(401, 'Unauthorized'));

        }
        req.user = user;
        next();
    })
}