const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const maintenance = require("../models/maintenance");

router.get("/maintenance", async (req, res) => {
  try {
    const maintenances = await maintenance.find({});
    res.send(maintenances);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/maintenance", async (req, res) => {
    try {
      const newMaintenance = new maintenance({
        id_area: req.body.id_area,
        id_computer: req.body.id_computer,
        date: req.body.date,
        support: req.body.support
      });
      const saved = await newMaintenance.save();
      if (saved) 
        return res.send(JSON.parse('{"message" : "Successful"}'));
      else
        return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
    } catch (error) {
      res.send(error);
    }
});

router.put("/maintenance/:id", async (req, res) => {
  try {
    const updateMaintenance = await maintenance.updateOne(
      { _id: req.params.id },
      {
        id_area: req.body.id_area,
        id_computer: req.body.id_computer,
        date: req.body.date,
        support: req.body.support
      }
    );
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.delete("/maintenance/:id", async (req, res) => {
  try {
    const deleteMaintenance = await maintenance.deleteOne({ _id: req.params.id });
    res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
