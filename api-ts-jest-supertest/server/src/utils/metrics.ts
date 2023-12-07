import express from 'express'
import client from 'prom-client'
import log from './logger'

// Prometheus 


// this is a different instance of express because we need to run our metrics server on a different port
// dont want to expose the metrics to internet, protected data
const app = express() 


export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer(){

  const collectDefaultMetrics = client.collectDefaultMetrics
  collectDefaultMetrics()

  // add single endpoint to our server so Prometheus can scrapped the metrics on a configurable interval (15 to 25 s)
  app.get('/metrics', async(req,res)=>{

    // set content type header
    res.set("Content-Type", client.register.contentType)

    // expose all of the metrics gathered by Prometheus
    res.send(await client.register.metrics())
  })

  app.listen(9100,() => {
    log.info("Metrics server start at http://localhost:9100")
  })

}