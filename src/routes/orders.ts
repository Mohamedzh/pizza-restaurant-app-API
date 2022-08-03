import { Router } from 'express'
import { Order } from '../Entities/order'
import { Product } from '../Entities/product'
import { In } from 'typeorm'
import { OrderLine } from '../Entities/orderLine'

const router = Router()

//Post a new order
router.post('/', async (req, res) => {
    try {
        const { name, mobile, address, city, productIds } = req.body
        const products = await Product.find({ where: { id: In(Object.keys(productIds) || []) } })
        console.log(products)
        const newOrder = Order.create({
            name, mobile, address, city
        })
        // console.log(newOrder)
        await Order.save(newOrder)
        const orderId = newOrder.id
        for (let i = 0; i < products.length; i++) {
            let productId = +Object.keys(productIds)[i]
            console.log(productId)
            // let product = await Product.findOne({where: {id: productId}})
            let quantity = productIds[productId]
            console.log(orderId, productId, quantity)
            // if (product){
            //    let productId=product.id
            const newOrderLine = OrderLine.create({ orderId, productId, quantity })
            await OrderLine.save(newOrderLine)
            // }
        }
        res.json({ newOrder })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

})

//Get an order
router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const order = await Order.findOne({ where: { id: id }, relations: { orderlines: { product: true } } })
        res.json({ order })
    } catch (error) {
        res.status(500).json({ error })
    }
})
//Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ relations: { orderlines: { product: true } } })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error })
    }

})

//Update order status
router.post('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const order = await Order.findOne({ where: { id: id }, relations: { orderlines: { product: true } } })
        const { completed } = req.body;
        const updatedOrder = await Order.update(order!.id, { completed })
        res.json({ updatedOrder })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router