const express = require('express');
require("./connect");
const Catalogue = require('./met');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const app = express()
const port = 7000

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//returns entire database
app.get("/", (req, res, next) => {
    Catalogue.find()
    .then(item => {res.send(item)});
});

//returns all parameters of an item by its key
app.get('/key/:key', (req, res) => {
    Catalogue.findOne({ "key": req.params.key})
        .then(item => {
            if (item === null){
                res.sendStatus(404).send("Oops! we couldn't find that trip!");
            } else {
                res.status(200).send(item);
            }
        })
        .catch(err => {
            res.sendStatus(500);
            console.error(err);
        });
})

//returns all parameters of an item by its ID
app.get('/id/:id', (req, res) => {
    Catalogue.findById(req.params.id)
    .then(item => {
        if (item === null){
            res.sendStatus(404).send("Oops! we couldn't find that product!");
        } else {
            res.status(200).send(item);
        }
    })
    .catch(err => {
        res.sendStatus(500);
        console.error(err);
    });
})

//test
app.get('/post/:name/:keyword', (req,res) => {
    let newItem = new Catalogue({
        key: mongoose.Types.ObjectId(),
        name: req.params.name,
        keyword: req.params.keyword,
    });

    newItem.save()
        .then(item => {
            console.log("Saved");
            res.status(200).send("Success!");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Failed");
        })
});

//posts trip
app.post('/save', (req,res) => {
  console.log("hi" + JSON.stringify(req.body));
  let newItem = new Catalogue({
      key: mongoose.Types.ObjectId(),
      artworks: req.body,
      name: "fuckyou",
  });

  newItem.save()
      .then(item => {
          console.log("Saved");
          res.status(200).send(item);
      })
      .catch(err => {
          console.log(err);
          res.status(500).send("Failed");
      })
});

app.listen(port, () => {
    console.log(`TripAPI listening at http://localhost:${port}`)
  })