const express = require("express");
var bodyParser = require('body-parser')
const app = express();

app.set("json spaces", 2);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

let data = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get("/data", (req, res) => {
  res.send(data);
});

app.get("/data/:id", (req, res) => {
  let id = req.params.id;
  if (data[id]) {
    res.send(data[id]);
  } else {
    res.status(404).send({ error: "No data found for the provided ID." });
  }
});

app.post("/data", (req, res) => {
  data.push(req.body);
  res.send(data);
});

app.put("/data/:id", (req, res) => {
  let id = req.params.id;
  if (data[id]) {
    data[id] = req.body;
    res.send(data[id]);
  } else {
    res.status(404).send("No data found for the provided ID.");
  }
});

app.delete("/data/:id", (req, res) => {
  let id = req.params.id;
  if (data[id]) {
    delete data[id];
    res.send("Data deleted successfully.");
  } else {
    res.status(404).send("No data found for the provided ID.");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

module.exports = app;