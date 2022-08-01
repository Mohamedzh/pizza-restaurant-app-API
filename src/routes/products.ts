import { Router } from 'express'
import { Product } from '../Entities/product'

const router = Router()
//Get all products
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json({ products })
})
//Post a new product
router.post('/', async (req, res) => {
    try {
        const { name, category, popular, price, description, imageUrl } = req.body
        const item = Product.create({
            name,
            category,
            popular,
            price,
            description,
            imageUrl
        })
        await Product.save(item)
        res.json({ item })
    } catch (error) {
        res.status(500).json({ error })
    }
})
//Update a product to popular/unpopular
router.post('/:id', async (req, res) => {
    try {
        const currentId = +req.params.id
    const item = await Product.findOne({ where: { id: currentId } })
    const { popular } = req.body;
    const updatedItem = await Product.update(item!.id, { popular: popular })
    res.json({updatedItem})
    } catch (error) {
        res.status(500).json({ error })
    }
    
})
//Remove a product
router.delete('/:id', async (req, res) => {
    try {
        const currentId = +(req.params.id)
    const item = await Product.findOne({ where: { id: currentId } })
     await Product.remove(item!)
    } catch (error) {
        res.status(500).json({ error })
    }
})


export default router