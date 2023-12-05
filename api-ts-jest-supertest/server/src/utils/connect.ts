import mongoose from "mongoose"
import config from "config"
import log from "./logger"

async function connect() {
  // const dbUri = config.get<string>("dbUri")
  const dbUri = process.env.MONGO_URI
  try {
    await mongoose.connect(dbUri)
    log.info("Connected to DB")
  } catch (error) {
    log.error("could not connect to db")
    process.exit(1)
  } 
}


export default connect