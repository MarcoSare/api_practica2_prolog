const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const computer = require("../models/computer");

router.get("/computer", async (req, res) => {
  try {
    const computers = await computer.find({});
    res.send(computers);
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/computer/:id", async (req, res) => {
  try {
    const computers = await computer.findOne({ _id: req.params.id });
    res.send(computers);
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/computer_by_user/:id", async (req, res) => {
  try {
    const computers = await computer.find({ id_user: req.params.id });
    res.send(computers);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/computer", async (req, res) => {
  try {
    const newComputer = new computer({
      serail_number :req.body.serail_number,
      brand: req.body.brand,
      model: req.body.model,
      processor: req.body.processor,
      ram: req.body.ram,
      storage: req.body.storage,
      prev_main : req.body.prev_main, // Preventive Maintenance
      corr_main: req.body.corr_main, // Corrective maintenance
      id_user: req.body.id_user,
      id_area: req.body.id_area
    });
    const saved = await newComputer.save();
    if (saved) return res.send(JSON.parse('{"message" : "Successful"}'));
    else
      return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.put("/computer/:id", async (req, res) => {
  try {
    const updateComputer = await computer.updateOne(
      { _id: req.params.id },
      {
        serail_number :req.body.serail_number,
        brand: req.body.brand,
        model: req.body.model,
        processor: req.body.processor,
        ram: req.body.ram,
        storage: req.body.storage,
        prev_main : req.body.prev_main, // Preventive Maintenance
        corr_main: req.body.corr_main, // Corrective maintenance
        id_user: req.body.id_user,
        id_area: req.body.id_area
      }
    );
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.delete("/computer/:id", async (req, res) => {
  try {
    const deleteComputer = await computer.deleteOne({ _id: req.params.id });
    res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;