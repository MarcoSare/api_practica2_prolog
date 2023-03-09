const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const area = require("../models/area");

router.get("/areas", async (req, res) => {
  try {
    const areas = await area.find({});
    res.send(areas);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/areas", async (req, res) => {
  try {
    const newArea = new area({
      name: req.body.name,
    });
    const saved = await newArea.save();
    if (saved) return res.send(JSON.parse('{"message" : "Successful"}'));
    else
      return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.put("/areas/:id", async (req, res) => {
  try {
    const updateArea = await area.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
      }
    );
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.delete("/areas/:id", async (req, res) => {
  try {
    const deleteArea = await area.deleteOne({ _id: req.params.id });
    res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
