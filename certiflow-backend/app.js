import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import routes from './routes/index.js';
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"
import { error } from 'console';
dotenv.config()

var app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect(process.env.MONGODBURL,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
  console.log('connected to mongoDB')
}).catch((error)=>{
  console.log(error)
})
app.use('/',routes.emailRoute)
app.use('/',routes.issuerRoute)
// app.use('/', indexRouter);
// const emailRouter = issuerRouter()
// app.use('/', emailRouter);
const server = http.createServer(app);
server.listen(3000,()=>{
  console.log('server is running on port 3000')
})
// module.exports = app;
