const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const computer = require("../models/computer");
const user = require("../models/user");
const area = require("../models/area");
const maintenance = require("../models/maintenance");
const historic = require("../models/historic");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const nodemailer = require('nodemailer');

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


router.put("/maintenance_complete/:id", async (req, res) => {
  try {
    //var todayDate = new Date().toLocaleDateString('en-US');
    const maintenances = await maintenance.findOne({ _id: req.params.id });
    const updateMaintenance = await maintenance.updateOne(
      { _id: req.params.id },
      {
        id_area: maintenances.id_area,
        id_computer: maintenances.id_computer,
        date: maintenances.date,
        support: maintenances.support,
        type: maintenances.type,
        is_completed: true,
        date_complete : new Date().toLocaleDateString('en-US'),
        description : req.body.description
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

router.get("/create_report", async (req, res) => {
  try {
    const maintenances = await maintenance.find();
    //console.log(maintenances);
    const report = maintenances.map(async (data)=>{
      const id_area = await area.findById({ _id: data.id_area }).select('name');
      const id_computer = await computer.findById({ _id: data.id_computer }).select('serail_number');
      const date = data.date;
      const support = await user.findById({ _id: data.support }).select('first_name last_name');
      const type = data.type;
      const is_completed = data.is_completed;
      //console.log("=> "+id_area.name+" "+id_computer.serail_number+" "+date+" "+(support.first_name+" "+support.last_name)+" "+type+" "+is_completed);
      const rep = {
        area: id_area.name,
        computer: id_computer.serail_number,
        date: date,
        support: (support.first_name+" "+support.last_name),
        type: type,
        is_completed: is_completed
      }
      //report.push(rep);
      //console.log(rep);
      return rep;
    });
    Promise.all(report).then(data=>{
      //console.log(data);
      let doc = new PDFDocument({ margin: 30, size: 'A4'});
      const table = { 
        "title": "Maintenance report",
        "subtitle": "Table",
        "headers": [
          { "label":"Area", "property":"area", "width":70 },
          { "label":"Computer", "property":"computer", "width":100 },
          { "label":"Date", "property":"date", "width":80 },
          { "label":"Support", "property":"support", "width":140 },
          { "label":"Type", "property":"type", "width":80 },
          { "label":"Completed", "property":"is_completed", "width":70 }
        ],
        "datas": data,
        "options": {
          "width": 300
        }
      };
      // the magic
      doc.table(table, {
        prepareHeader: () => {doc.font("Helvetica-Bold").fontSize(11)},
        prepareRow: (row, indexColumn, indexRow, rectRow) => {
          doc.font("Helvetica").fontSize(11);
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
      });
      //doc.table(table);
      doc.pipe(res);
      // done!
      doc.end();
    })
    
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/send_email", async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "19030263@itcelaya.edu.mx, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send("send uwu");
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
