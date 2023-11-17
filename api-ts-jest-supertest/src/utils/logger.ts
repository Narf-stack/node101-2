// import logger from 'pino'
import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs' // for the timestamps


const log = pino({
  transport: {
    target: 'pino-pretty',
    base: {
      pid: false,
    },
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss' //`${dayjs().format()}`
    }
  }
})

export default log