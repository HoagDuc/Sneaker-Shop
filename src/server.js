import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up ViewEngine
configViewEngine(app);
//  Init Web Rout
initWebRoute(app);
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
