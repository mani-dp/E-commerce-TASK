import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";
import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

//  register ==========================================
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                data: null,
                message: "Email already exists",
            })
        }
        // HASHINPASS---------
        const hashedPassword = await bcrypt.hash(password, 10);
        // -------------------
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            message: "User registered successfully",
        });
    } catch (err) {
        next(err);
    }
}

// LOGIN ==========================================

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        //     ** REMEMBER : should use t for token cuz it's convention; **    //

        const token = generateToken({
            id: user.id,
            role: user.role,
        });

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // role: user.role,
                },
                token,
            },
            message: "Login successful",
        })

    } catch (err) {
        next(err);
    }
}

export { register, login };



