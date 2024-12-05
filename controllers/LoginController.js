const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const { ErrorHandler } = require('../error/errorHandler');


LoginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user) throw new ErrorHandler('User not found',

            404);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)

            throw new ErrorHandler('Invalid Credentials', 400);

        const token = jwt.sign({ id: user.id, email: user.email },
            'secret_key', { expiresIn: '1h' });
        await prisma.users.update({
            where: { id: user.id },
            data: { jwtToken: token }
        });

        res.cookie('token', token,
            { httpOnly: true, secure: true }).json({
                userName:user.username,
                success: true, message: 'Logged in successfully',
                token:token,
            });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error user details! ' })
    }
};

UserControllerlogout = async (req, res) => {
    try {
        var result = await prisma.users.update({
            where: { id: req.user.id },
            data: { jwtToken: null }
        });
        res.clearCookie('token').json({
            success: true,
            message: 'Logged out successfully',
            result: result
        });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error user details! ' })
    }
};
module.exports = { LoginUserController, UserControllerlogout };
