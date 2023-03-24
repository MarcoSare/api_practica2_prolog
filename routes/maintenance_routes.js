const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const computer = require("../models/computer");
const user = require("../models/user");
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

router.get("/maintenance_by_support/:id", async (req, res) => {
  try {
    const maintenances = await maintenance.find({ support: req.params.id });
    //const users = await user.findOne({ _id: req.params.id });
    console.log("sdf")
    const newArray = maintenances.map(async (item)=>{
      const userID = await computer.findById(item.id_computer).select('id_user')
      const userName = await user.findById(userID.id_user).select('first_name last_name')
      const OneRegister =  {
        id_area: item.id_area,
        id_computer: item.id_computer,
        date: item.date,
        support: item.support,
        type: item.type,
        user: (userName.first_name + ' ' + userName.last_name)
    }
    return OneRegister
    })
    
    Promise.all(newArray).then(data=>{
      res.send(data)
    })
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
        type: req.body.type,
        is_completed: req.body.is_completed
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
        type: req.body.type,
        is_completed: req.body.is_completed
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
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.get("/historic", async (req, res) => {
  try {
    const history = await historic.find({});
    res.send(history);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
