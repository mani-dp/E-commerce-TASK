import express from "express";
import { register, login } from "../controllers/auth.controller.js"
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import validate from "../middleware/validation.middleware.js";

const Authrouter = express.Router()
Authrouter.post("/register", registerValidator, validate, register);
Authrouter.post("/login", loginValidator, validate, login)

export default Authrouter;

