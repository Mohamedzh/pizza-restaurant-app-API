import { Router } from 'express'
import { Category } from '../Entities/category'
import { Order } from '../Entities/order'

const router = Router()

//Post a new category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        const newCat = Category.create({
            name
        })
        console.log(newCat)
        await Category.save(newCat)
        res.json({ newCat })
    } catch (error) {
        res.status(500).json({ error })
    }
})
//Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ relations: { products: true } })
        res.json({ categories })
    } catch (error) {
        res.status(500).json({ error })
    }

})
export default router