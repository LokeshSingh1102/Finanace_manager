import { Hono } from 'hono'
import { getPrisma } from '../db'
import { SignatureKey } from 'hono/utils/jwt/jws'

export const savingRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: SignatureKey
    },
    Variables: {
        userId: string
    }
}>()

savingRoute.post('/save', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const now = new Date()
    const body = await c.req.json()

    let month = (now.getMonth() + 1)
    let year = now.getFullYear()
    const date = month < 10 ? 0 + "" + month + "" + year : month + "" + year

    // console.log(month, year, date);

    const userId = c.get('userId')
    // console.log(userId,body.amount);

    try {

        const expense = await prisma.expense.aggregate({
            where:{
                category:body.category
            },
            _sum:{
                amount:true
            }
        })
        // console.log(expense._sum.amount);
        

        const savingId = await prisma.budget.update({
            where:{
                category: body.category
            },
            data:{
                saving:{
                    create:{
                        date:date,
                        amount : expense._sum.amount || 0,
                        userId : userId
                    }
                }
            }
        })
        return c.json('data saved successfully')
    } catch (error) {
        // console.log(error);

        return c.json('data did not saved', 401)
    }
})


savingRoute.post('/budget', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const now = new Date()
    const body = await c.req.json()

    const userId = c.get('userId')
    // console.log(userId,body.amount);

    try {
        const budgetId = await prisma.budget.create({
            data:{
                total_money: body.amount,
                category: body.category
            }
        })
        return c.json('data saved successfully')
    } catch (error) {
        // console.log(error);
        return c.json('data did not saved', 401)
    }
})