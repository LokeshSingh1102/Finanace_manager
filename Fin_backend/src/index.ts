import { Hono } from 'hono'
import { getPrisma } from './db'
import { jwt, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'
import { SignatureKey } from 'hono/utils/jwt/jws'
import { createMiddleware } from 'hono/factory'
import { userRoute } from './Routes/userRoute'
import { expenseRoute } from './Routes/expenseRoute'
import { savingRoute } from './Routes/savingRoute'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: SignatureKey
  }
  Variables: {
    userId: string
  }
}>()

const authenticateUser = createMiddleware(async (c, next) => {
  const header = c.req.header('Authorization') || ''
  // const token = header.split(" ")[1]
  const res = await verify(header, 'secret', 'HS256')
  if (!res) {
    return c.json({ message: 'Unathorized' }, 401)
  }
  else {    
    c.set("userId", res.id)
    await next()
  }
})

app.use('/*', cors())

app.get('/', (c) => {
  console.log("hello", c.env.JWT_SECRET);
  return c.text('Hello Hono!')
})


app.route('/user',userRoute)
app.use('*',authenticateUser)
app.route('/expense',expenseRoute)
app.route('/saving',savingRoute)



export default app
