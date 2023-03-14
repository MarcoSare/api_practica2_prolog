const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const computer = require("../models/computer");

router.get("/computer", async (req, res) => {
    try {
      const areas = await area.find({});
      res.send(areas);
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
        id_user: req.body.id_user
      });
      const saved = await newComputer.save();
      if (saved) return res.send(JSON.parse('{"message" : "Successful"}'));
      else
        return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
    } catch (error) {
      res.send(error);
    }
  });

  module.exports = router;