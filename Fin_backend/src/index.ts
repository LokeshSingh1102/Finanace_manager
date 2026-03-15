import { Hono } from 'hono'
import { getPrisma } from './db'
import { jwt, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'
import { SignatureKey } from 'hono/utils/jwt/jws'
import { createMiddleware } from 'hono/factory'

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


app.post('/signup', async (c) => {
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

app.post('/signin', async (c) => {
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


app.post('/store/:id',authenticateUser,async (c)=>{
  const prisma = getPrisma(c.env.DATABASE_URL)
  let category = c.req.param('id')
  category = category.substring(1,category.length)
  const body = await c.req.json()
  const userId = c.get('userId')
  try {
    const getPreviousPayment = await prisma.expense.findUnique({
      where:{
        payment_to:body.payment_to
      }
    })
    if(!getPreviousPayment){
      const expenseId = await prisma.expense.create({
        data:{
          category:category,
          payment_to:body.payment_to,
          amount: body.amount,
          userId: userId
        } 
      })
    }
    else{
      const expenseUpdate = await prisma.expense.update({
        where:{
          id:getPreviousPayment.id
        },
        data:{
          amount:getPreviousPayment.amount+body.amount
        }
      })
    }
    // console.log("before creation");
    // console.log(body,userId,category,body.amount,body.payment_to);
    // const allExpense = await prisma.expense.findMany({
    //   where:{category:category}
    // })
    // console.log("after creation",allExpense);
    return c.json({message:'expense stored sucessfully'})
  } catch (error) {
    console.log(error);
    
    return c.json({message:'could not save the expense',error:error},401)
  }
})

app.get('/allexpense/:id',authenticateUser,async (c)=>{
  const prisma = getPrisma(c.env.DATABASE_URL)
  const category = c.req.param('id')

  try {
    console.log(category);
    
    const allExpense = await prisma.expense.findMany({
      where:{category:category.substring(1,category.length)}
    })
    console.log(allExpense);
    
    return c.json({data:allExpense})
  } catch (error) {
    return c.json({message:'could not any expense'},404)
  }
})

app.get('/deleteAllExpense',authenticateUser,async (c)=>{
  const prisma = getPrisma(c.env.DATABASE_URL)
  try {
    
    const allExpense = await prisma.expense.deleteMany()
    console.log(allExpense);
    
    return c.json({message:"all records are deleted from expense table"})
  } catch (error) {
    return c.json({message:'could not any expense'},404)
  }
})

export default app
