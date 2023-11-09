require('dotenv').config();
require('express-async-errors');

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')
const expressRateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

// connectionDB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// init security packages
app.set('trust proxy',1)
app.use(expressRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}))
app.use(helmet())
app.use(cors())
app.use(xssClean())
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) 
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
