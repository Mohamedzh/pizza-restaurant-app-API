import { Router } from 'express'
import { Order } from '../Entities/order'
import { Product } from '../Entities/product'
import { In } from 'typeorm'
import { OrderLine } from '../Entities/orderLine'

const router = Router()


interface productId {
    id: number,
    quantity: number
}
//Post a new order
router.post('/', async (req, res) => {
    try {
        const { name, mobile, address, city, productIds } = req.body
        const products = await Product.find({ where: { id: In(productIds.map((product: productId) => product.id) || []) } })
        console.log(products)
        const newOrder = Order.create({
            name, mobile, address, city
        })
        // console.log(newOrder)
        await newOrder.save()
        const order = newOrder
        for (let i = 0; i < products.length; i++) {
            let product = productIds[i].id
            console.log(product)
            let quantity = productIds[i].quantity
            console.log(order, product, quantity)
            const newOrderLine = OrderLine.create({ order, product, quantity })
            await newOrderLine.save()
            console.log(newOrderLine)
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
router.patch('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const order = await Order.findOne({ where: { id } })
        order!.completed = true;
        await order?.save()
        res.json({ order })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router