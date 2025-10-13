import userModel from "../model/userModel.js";


    const addUser = async (req,res,next) => {
    try {
        const user = new userModel(req.body);
        const newUser = await user.save();
        if(newUser) {
            res.status(200).json({message:"you are logged in",newUser});
        }else {
            res.status(404).json({message:"we have an error someWhere"});
        }
        next();
    }catch(err) {
        console.error(err);
    } 
    
}

    const deleteUser = async (req,res,next) =>{
        try {
            const userDeleted = await userModel.findByIdAndDelete(res.params.id);
            if(userDeleted) {
                res.status(200).json({userDeleted,message: "he is deleted"});
            }else {
                res.status(404).json({message:"we have an error someWhere"});
            }
            next();
        }catch(err) {
            console.error(err);
        }
  }

  export {addUser,deleteUser};