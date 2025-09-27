import ToDoModel from "../model/ToDoModel.js";
import ConfigDb from "../Config/configDB.js";
import { config } from "dotenv";

config();
ConfigDb(process.env.NAME_DB || "TODO_DB");

const register = async (req,res,next) => {
    try {
        const ToDoWantedToAdd = new ToDoModel(req.body);
        const TODO = await ToDoWantedToAdd.save();
        if(ToDoWantedToAdd) {
            res.status(200).json({ToDoWantedToAdd,message:`${ToDoWantedToAdd.userName} is registered`});
        }else {
            res.status(404).json({message:"we have an error somewhere please try again"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const getAll = async (req,res,next) =>{
    try {
        const AllToDos = await ToDoModel.find({});
        if(AllToDos) {
            res.status(200).json({AllToDos,message:"Done👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const getAToDo = async (req,res,next) => {
    try {
        const ToDoWantedToGet = await ToDoModel.findById(req.params.id);
        if(ToDoWantedToGet) {
            res.status(200).json({ToDoWantedToGet,message:"well done👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const getAToDoByTitle = async (req,res,next) => {
    try {
        const Title =  req.body;
        const ToDo = await ToDoModel.findOne(Title);
        if(ToDo) {
            res.status(200).json({ToDo,message:"Done👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const UpdateAToDo = async (req,res,next) => {
    try {
        const ToDo = await ToDoModel.findByIdAndUpdate(req.params.id,req.body);
        if(ToDo) {
            res.status(200).json({ToDo,message:"Done👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const DeleteATodo = async (req,res,next) => {
    try {
        const ToDoWantedToDelete = await ToDoModel.findByIdAndDelete(req.params.id);
        if(ToDoWantedToDelete) {
            res.status(200).json({ToDoWantedToDelete,message:"the ToDo is Deleted 👌 good job"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

const userLogin = async(req,res,next) => {
    try {
        const {userName,password} = req.body;
        const user = await ToDoModel.login(userName,password);
        if(user) {
            res.status(200).json({user,message:"good job 👌"});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    }
}

export {register,getAll,getAToDo,getAToDoByTitle,UpdateAToDo,DeleteATodo,userLogin};
