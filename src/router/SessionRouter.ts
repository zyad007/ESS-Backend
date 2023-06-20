import { Router } from "express";
import auth from "../middleware/auth";


const SessionRouter = Router();

SessionRouter.use('/course', auth);



export default SessionRouter;