import { Router } from 'express'
import { Order } from '../Entities/order'
import { Product } from '../Entities/product'
import {In} from 'typeorm'

const router = Router()

//Post a new order
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, address, city, productIds } = req.body
        const products = await Product.find({where:{id: In(productIds || [])}})
        console.log(products)
        const newOrder = Order.create({
            firstName, lastName, address, city, products
        })
        console.log(newOrder)
        await Order.save(newOrder)
        res.json({newOrder})
    } catch (error) {
        res.status(500).json({ msg:error })
    }

})

//Get an order
router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const order = await Order.findOne({ where: { id: id }, relations: { } })
        res.json({ order })
    } catch (error) {
        res.status(500).json({ error })
    }

})
//Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = Order.find()
        res.json({ orders })
    } catch (error) {
        res.status(500).json({ error })
    }

})
export default router