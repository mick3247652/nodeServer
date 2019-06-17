import express from "express";
import bodyParser from "body-parser";
import {MongoClient} from 'mongodb';
import {Database} from './db'

import router from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = 8000;

MongoClient.connect(Database.mongoUrl, (err, database) => {
  if (err) return console.log(err)
  Database.database = database.db()
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})