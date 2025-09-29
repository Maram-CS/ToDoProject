import jwt from "jsonwebtoken";
import ToDoModel from "../model/ToDoModel.js";
import {config} from "dotenv";

config();
const createAToken = (id) => {
    jwt.sign({id},process.env.SECRET_KEY || TODO_KEY,{expiresIn:"3 days"} );
} 

const userLogin = async(req,res,next) => {
    try {
        const {userName,password} = req.body;
        const user = await ToDoModel.login(userName,password);
        if(user) {
            const Token = createAToken(user._id);
            res.cookie("ToDoCookie",Token,{maxAge:24*3*60*60*1000,httpOnly: true});
            res.status(200).json({user,message:"good job 👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

export default userLogin;