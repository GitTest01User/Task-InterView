const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");  

const prisma = new PrismaClient();

 userValue = async (req, res) => {
    try {
        const { id, email } = req.query;
        const whereChoser = {};

        if (id) {
            whereChoser.id = parseInt(id);
        }

        if (email) {
            whereChoser.email = email;
        }

        let tbl;
        if (Object.keys(whereChoser).length > 0) {
            tbl = await prisma.users.findMany({
                where: whereChoser,
            });
        } else {
            tbl = await prisma.users.findMany();
        }

        res.status(200).send({
            status: true,
            result: tbl,
            message: "Success",
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "User not found!",
        });
    }
};

 ValuePost = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.users.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.json({
            message: 'User registered successfully',
            user: { id: user.id, username: user.username, email: user.email },  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

 ValueUpdate = async (req, res) => {
    const { id } = req.query;
    const { email, name, password, age, sessionId, active } = req.body;

    try {
        const userData = {};

        if (email) userData.email = email;
        if (name) userData.name = name;
        if (password) userData.password = await bcrypt.hash(password, 10);  
        if (age) userData.age = age;
        if (sessionId) userData.sessionId = sessionId;
        if (active !== undefined) userData.active = active;

        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: userData,
        });

        res.status(200).send({
            status: true,
            result: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "User update failed!",
        });
    }
};

 ValueDelete = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await prisma.users.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).send({
            status: true,
            result: user,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "User deletion failed!",
        });
    }
};

module.exports = { userValue, ValuePost, ValueUpdate, ValueDelete };
