import { Hono } from 'hono'
import { getPrisma } from './db'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.get('/', (c) => {
  
  return c.text('Hello Hono!')
})
app.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const userId = await prisma.user.create({
    data:{
      name:'Lokesh 2',
      username:'lokeshsingh1102@gmail.com',
      password:'123456'
    }
  })
  return c.json(userId.id)
})

export default app
