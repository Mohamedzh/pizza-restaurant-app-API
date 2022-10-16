import { Router } from 'express'
import { Category } from '../Entities/category'

const router = Router()

router.post('/', async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Post a new category'
    #swagger.parameters['name'] = {
        in: 'body',
        description: 'The name of the category',
        schema: {$name: 'Appetizers'}
    }
    */
    try {
        const { name }: { name: string } = req.body
        const newCat = Category.create({
            name
        })
        await Category.save(newCat)
        res.json({ category: newCat })
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.get('/', async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get all categories'
    try {
        const categories = await Category.find({ relations: { products: true } })
        res.json({ categories })
    } catch (error) {
        res.status(500).json({ error: `error occured as ${error}` })
    }
})

router.delete('/', async (req, res) => {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Delete a specific category'
    #swagger.parameters['name'] = {
        in: 'body',
        description: 'The name of the category',
        schema: {$name: 'Appetizers'}
    }
    */
    try {
        const { name }: { name: string } = req.body
        const newCat = await Category.findOneBy({
            name
        })
        if (newCat) {
            await Category.remove(newCat)
            res.json({ msg: `category ${name} deleted` })
        }
        else {
            res.status(404).send('no category exists with the given name')
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router