import bcrypt from "bcrypt";
import db from '../database/db.js';
import { v4 as uuid } from "uuid";

const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

async function signUp(req, res) {
    const { name, email, password } = res.locals.user;
    
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const listUsers = await usersCollection.find().toArray();

        const userExists = listUsers.find(value => value.email === email);
        
        if (userExists) {
            return res.status(409).send("This email already exists.");
        }

        await usersCollection.insertOne({
            name,
            email,
            password: passwordHash
        });

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function login(req, res) {
    const { email, password } = res.locals.user;

    try {
        const user = await usersCollection.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401);
        }

        const token = uuid();

        await sessionsCollection.deleteOne({ userId: user._id });

        await sessionsCollection.insertOne({
            userId: user._id,
            token
        });

        delete user.password;

        res.status(200).send({
            ...user,
            token
        })

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp, login };