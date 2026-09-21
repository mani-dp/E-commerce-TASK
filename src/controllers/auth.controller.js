import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

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
                password : hashedPassword,
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

export default register;


// duz its my birthday