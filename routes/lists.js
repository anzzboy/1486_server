import db from "../db/connection.js";
import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  let collection = await db.collection("lists");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Create new list
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      list: req.body.order,
    };
    let collection = await db.collection("lists");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error adding list");
  }
});

// Delete by _id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("lists");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting list");
  }
});

export default router;
