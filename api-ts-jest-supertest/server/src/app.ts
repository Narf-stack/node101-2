// import express from 'express'
import * as dotenv from 'dotenv'
import createServer from './utils/server';
// import path from "path";
// set env variable
// Parsing the env file. Should be done before anyfile using one of the variable defined
// dotenv.config({ path: './.env' });
// dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });
dotenv.config();

import config from 'config'
import connect from './utils/connect'
import log from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import { startMetricsServer } from './utils/metrics'
import swaggerDocs from './utils/swagger'

// set app 
// export const app = express()
export const app = createServer()
// fetch default parameters from the configuration files 
const port = config.get<number>('port')

// app.use(deserializeUser)
// app.use(express.json())

// start server
app.listen(port,async()=> {
  log.info(`server listening on port ${port}`)
  //DB connection
  await connect()
  //calling routes
  // routes(app)
  startMetricsServer()
  swaggerDocs(app,port)
})
