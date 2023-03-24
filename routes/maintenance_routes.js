const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const maintenance = require("../models/maintenance");
const historic = require("../models/historic");


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
        support: req.body.support,
        type: req.body.type
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
        support: req.body.support,
        type: req.body.type
      }
    );
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.delete("/maintenance/:id", async (req, res) => {
  try {

    const maint = await maintenance.findOne({ _id: req.params.id });

    const saved = await maint.save();
      if (saved) 
        return res.send(JSON.parse('{"message" : "Successful"}'));
      else
        return res.status(400).send(JSON.parse('{"message" : "No successful"}'));

    const deleteMaintenance = await maintenance.deleteOne({ _id: req.params.id });
    res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.get("/historic", async (req, res) => {
  try {
    const historic = await historic.find({});
    res.send(historic);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
