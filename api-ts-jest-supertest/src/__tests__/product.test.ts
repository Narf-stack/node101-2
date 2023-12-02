import supertest from "supertest"
import createServer from "../utils/server"
import { MongoMemoryServer} from "mongodb-memory-server" // will start an in memory version of MongoDB, because we connect in the code (overkill option, because we are mocking the MongodDB service)
import mongoose from "mongoose"


const app = createServer()
describe('product', () => {
  beforeAll(async() => {
    const mongoServer = await MongoMemoryServer.create() // create an instance of MongoDB in memory so we can connect

    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async()=>{ // will close the connection to MongoDB
    await mongoose.disconnect()   
    await mongoose.connection.close()
  })

  describe('get product route', ()=>{
    describe('given the product does not exist', ()=>{ // under what condition it is being tested
      it('should return a 404', async()=>{ // supertest return a promess so we need a async here  
        const productId= 'product-123'

        await supertest(app).get(`/api/products/${productId}`).expect(404) // supertest is a way to you the api 
      })
    })
  })
})