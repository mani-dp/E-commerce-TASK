import express from "express";
import register from "../controllers/auth.controller.js"
import { registerValidator } from "../validators/auth.validator.js";
import validate from "../middleware/validation.middleware.js";

const Authrouter = express.Router()
Authrouter.post( "/register", registerValidator, validate, register);

export default Authrouter;

