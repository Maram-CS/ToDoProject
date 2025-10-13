import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs";

const modelUser = new Schema ({
  userName : {
    type : String,
    require : true,
  },
  password : {
    type : String,
    require : true,
  }
},{timestamps:true})

    modelUser.pre("save",function (next) {
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

    modelUser.statics.login = async function(userName,password) {
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

const userModel = model("userModel",modelUser);
export default userModel;