const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: any, res: any) => {
  console.log(req, res);
  res.send({ message: "Hello World!" });
});

exports.handler = app;
