import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import db from "../database/db.js";

let date = dayjs().locale("pt-br").format("DD/MM");

const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");
const valuesCollection = db.collection("values");

async function insertValue(req, res) {
  const { value, text, type } = res.locals.value;
  const { token } = res.locals.token;

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }
    
    await valuesCollection.insertOne({
      value,
      text,
      type,
      userId: ObjectId(session.userId),
      date
    });

    res.sendStatus(201);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getValues(req, res) {
  const { token } = res.locals.token;

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await usersCollection.findOne({
      _id: session.userId
    });

    if(!user) {
      return res.sendStatus(401);
    }

    const values = await valuesCollection.find({
      userId: user._id
    }).toArray();

    res.status(200).send(values);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateValue(req, res) {
  const { id } = req.params;
  const { value, text } = res.locals.value;

  if(!id) {
    return res.sendStatus(400);
  }

  try {
    const isValue = await valuesCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!isValue) {
      return res.sendStatus(404);
    }

    await valuesCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        value,
        text
      }
    });

    res.sendStatus(200);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteValue(req, res) {
  const { id } = req.params;

  if(!id) {
    return res.sendStatus(400);
  }

  try {
    const isValue = await valuesCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!isValue) {
      return res.sendStatus(404);
    }

    await valuesCollection.deleteOne({
      _id: new ObjectId(id)
    });

    res.sendStatus(200);

  } catch (error) {
    res.status(500).send(error.message); 
  }
}

export { insertValue, getValues, updateValue, deleteValue };