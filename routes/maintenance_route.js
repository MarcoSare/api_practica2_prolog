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

/*router.post("/maintenance", async (req, res) => {
    try {
      const newMaintenance = new maintenance({
          id_area: req.body.id_area,
          id_area: req.body.id_area,
          id_area: req.body.id_area,
          id_area: req.body.id_area
      });
      const saved = await newMaintenance.save();
      if (saved) return res.send(JSON.parse('{"message" : "Successful"}'));
      else
        return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
    } catch (error) {
      res.send(error);
    }
});*/

module.exports = router;