import { Express, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc' // build the swagger doc 
import swaggerUi from 'swagger-ui-express' // expose the doc in an interface 
import {version } from '../../package.json' // import the version from the package.json to put it on the doc  
import log from './logger'


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info:{
      title: 'NodeJs Rest API doc ',
      version // imported from the package.json
    },
    components:{
      securitySchemas:{ // Refelcts the way the auth is set up 
        bearerAuth:{ //because using a bearer token for the authentification
          type:'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',

        },
      },
    },
    security: [
      {
        bearerAuth:[],
      },
    ],
  },
  apis:['./src/routes.ts','./src/schema/*.ts'] // array of pasths where api is defines
}


const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app:Express, port:number){
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  //Docs in json format
  app.get('docs.json', (req:Request, res:Response)=>{
    res.setHeader('Content-type', 'application/json')
    res.send(swaggerSpec)
  })
  log.info(`doc available at http://localhost:${port}/docs`)
}


export default swaggerDocs