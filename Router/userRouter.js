import {Router} from "express";
import {addUser,deleteUser} from "../controller/userController.js";
import userLogin from "../controller/authController.js";

const userRouter = Router();

userRouter.post("/addUser",addUser);
userRouter.delete("/deleteUser",deleteUser);
userRouter.post("/userLogin",userLogin);

export default userRouter;