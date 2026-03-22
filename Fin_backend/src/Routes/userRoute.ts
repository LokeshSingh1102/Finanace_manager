import { SignatureKey } from "hono/utils/jwt/jws"
import { getPrisma } from "../db"
import { Hono } from "hono"
import { sign } from "hono/jwt"

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: SignatureKey
  }
  Variables: {
    userId: string
  }
}>()

userRoute.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  const body = await c.req.json()
  try {
    const userId = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password
      }
    })
    const token = await sign({ id: userId.id }, 'secret')
    return c.json(token)
  } catch (error) {
    return c.json(error, 403)
  }
})

userRoute.post('/signin', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json()
  // console.log(body.data);
  // return c.json('ok')
  
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    })
    // return c.json('ok')
    if(!user){
      return c.json({message:'User doesnot exist'},404)
    }
    const token = await sign({ id: user.id }, 'secret')
    return c.json({ token: token })

  } catch (error) {
    console.log(error);
    
    return c.json(error, 403)
  }
})
