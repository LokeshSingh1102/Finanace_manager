import { SignatureKey } from "hono/utils/jwt/jws"
import { getPrisma } from "../db"
import { Hono } from "hono"

export const expenseRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: SignatureKey
  }
  Variables: {
    userId: string
  }
}>()

expenseRoute.post('/store/:id',async (c)=>{
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

expenseRoute.get('/allexpense/:id',async (c)=>{
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

expenseRoute.get('/deleteAllExpense',async (c)=>{
  const prisma = getPrisma(c.env.DATABASE_URL)
  try {
    
    const allExpense = await prisma.expense.deleteMany()
    console.log(allExpense);
    
    return c.json({message:"all records are deleted from expense table"})
  } catch (error) {
    return c.json({message:'could not any expense'},404)
  }
})