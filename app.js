const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.set("view engine", "ejs");

app.listen(8080, () => {
  console.log('Running at Port 8080...');
});

app.use(express.static(path.join(__dirname, 'public')), (req, res) => {
  const data = {
    appId: process.env.APPID
  }
  res.render("./public/scripts/script.ejs", data);
});

app.use((req, res) => {
  res.sendStatus(404);
});
