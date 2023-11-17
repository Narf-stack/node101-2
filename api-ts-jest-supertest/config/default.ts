export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.MONGO_URI || "",
  saltWorkFactor: process.env.SALT_WORK_FACTOR || 10
}