import {Router} from "express";
import {register,getAll,getAToDo,getAToDoByTitle,UpdateAToDo,DeleteATodo} from "../controller/ToDoController.js";
import userLogin from "../controller/authController.js";
const router = Router();

router.post("/register",register);
router.get("/getAll",getAll);
router.get("/getAToDo/:id",getAToDo);
router.post("/getAToDoByTitle",getAToDoByTitle);
router.put("/updateAToDo/:id",UpdateAToDo);
router.delete("/deleteAToDo/:id",DeleteATodo);


export default router;
