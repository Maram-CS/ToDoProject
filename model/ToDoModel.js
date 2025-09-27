import bcrypt from "bcryptjs";
import { Schema,model } from "mongoose";

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
    userName : {
        type :String,
        required :true,
    },
    password : {
        type : String,
        required : true,
    }
},{timestamps:true});

    modelSchema.pre("save",function (next) {
        const user = this;
        try {
            if(!user.isModified("password")) {
                next();
            }else {
            bcrypt.genSalt(10,(err,salt) => {
                if(err) {
                    next();
                }
                bcrypt.hash(user.password,salt,(err,hash)=>{
                    if(err) {
                        next();
                    }
                    user.password = hash;
                    next();
                })
            })}
        }catch(err) {
            console.error(err);
        }
    })

    modelSchema.statics.login = async function(userName,password) {
        const user = await this.findOne({userName});
        if(user) {
            const isUser = await bcrypt.compare(password,user.password);
        if(isUser) {
            console.log("you are logged in");
            return user;
        }else {
            console.log("your password is wrong");
        }
        }else {
        throw Error("we can not find an user with this userName");
    }
    }

const ToDoModel = model("ToDoModel",modelSchema);

export default ToDoModel;