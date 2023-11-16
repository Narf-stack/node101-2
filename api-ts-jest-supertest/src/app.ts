import express from 'express'
import * as dotenv from 'dotenv'
// import path from "path";
// set env variable
// Parsing the env file. Should be done before anyfile using one of the variable defined
// dotenv.config({ path: './.env' });
// dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });
dotenv.config();

import config from 'config'
import connect from './utils/connect'

// set app 
const app = express()


// fetch default parameters from the configuration files 
const port = config.get<number>('port')


// start server
app.listen(port,async()=> {
  console.log(`server listening on port ${port}`)
  await connect()
})
