const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const user = require("../models/user");

router.get("/user", async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/user/:id", async (req, res) => {
    try {
      const users = await user.findOne({ _id: req.params.id });
      res.send(users);
    } catch (error) {
      return res.send(error.message);
    }
  });

router.post("/user", async (req, res) => {
  try {
    const newUser = new user({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        telephone: req.body.telephone,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
    });
    const saved = await newUser.save();
    if (saved) return res.send(JSON.parse('{"message" : "Successful"}'));
    else
      return res.status(400).send(JSON.parse('{"message" : "No successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const updateUser = await user.updateOne(
      { _id: req.params.id },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        telephone: req.body.telephone,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
      }
    );
    return res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const deleteUser = await user.deleteOne({ _id: req.params.id });
    res.send(JSON.parse('{"message" : "Successful"}'));
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;