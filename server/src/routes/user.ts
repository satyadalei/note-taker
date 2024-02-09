import express from "express";

const router = express.Router();
import { handleCreateUser, handleUserLogin, handleDeleteUser, handleUpdateUser, userDetails } from "../controllers/user";
import { authorizeUser, CustomRequest } from "../middlewares/user"

router
    .route("/createUser")
    .post((req, res) => {
        handleCreateUser(req,res)
    })

router
    .route("/login")    
    .post((req, res) => {
        handleUserLogin(req,res);
    })
    
router
    .route("/deleteUser")    
    .get((req, res) => {
        handleDeleteUser(req, res);
    })

router
    .route("/updateUser")
    .patch(authorizeUser,(req, res) => {
        const update:userDetails = {_id: "65b848427d5cb96fd153296f", name:"Satyanarayanan Dalei"};
        handleUpdateUser(req, res);
    })    


export default router;