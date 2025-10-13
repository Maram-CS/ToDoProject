import express from "express";
import {config} from "dotenv";
import router from "./Router/ToDoRouter.js";
import userRouter from "./Router/userRouter.js";

config();
const Port = process.env.PORT || 3000;
const App = express();

App.use(express.json());
App.use(express.urlencoded({extended : true}));
App.use("/ToDoRouter",router);
App.use("/userRouter",userRouter);

App.listen(Port,() => {
    console.log(`the server is working on port ${Port}`);
})
