import bcryptjs from 'bcryptjs'
import { mongooseConnect } from "../../../lib/mongoose";
import User from "../../../models/User";

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const { name, email, password } = req.body;
    if (
        !name ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 5
    ) {
        res.status(422).json({
            message: 'Validation error',
        });
        return;
    }

    await mongooseConnect();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(422).json({
            message: 'User exist already!',
        });
        return;
    }

    const newUser = new User({
        name,
        email,
        password: bcryptjs.hashSync(password),
        isAdmin: false,
    });

    const user = await newUser.save();
    res.status(201).send({
        message: 'Created user!',
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
}

export default handler