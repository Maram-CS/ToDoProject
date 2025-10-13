import mongoose, { Schema,model } from "mongoose";

const modelSchema = new Schema({
    Title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"userModel",
    }
  
},{timestamps:true});

const ToDoModel = model("ToDoModel",modelSchema);

export default ToDoModel;