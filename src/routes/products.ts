import { Router } from 'express'
import { Product } from '../Entities/product'
import AppDataSource from '../data-source'

const router = Router()
const productRepository = AppDataSource.getRepository(Product);

router.get('/', async (req, res) => {
    /* 
       #swagger.tags = ['Products']
       #swagger.summary = 'Get all menu products'
    */
    const products = await productRepository.find({ relations: { category: true } });
    // const products = await Product.find({ relations: { category: true } })
    res.json({ products })
})

router.post('/', async (req, res) => {
    try {
        /* 
           #swagger.tags = ['Products']
           #swagger.summary = 'Post a new product'
           #swagger.parameters['name', 'category', 'popular', 'price', 'description', 'imageUrl'] = {
            in: 'body',
            description: 'The id of the order to update' 
           }
        */
        const { name, category, popular, price, description, imageUrl } = req.body
        const item = productRepository.create({
            name,
            category,
            popular,
            price,
            description,
            imageUrl
        })
        await productRepository.save(item)
        res.json({ item })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/:id', async (req, res) => {
    try {
        /*
           #swagger.tags = ['Products']
           #swagger.summary = 'Update product status to popular/unpopular'
           #swagger.parameters['id'] = { 
            in: 'path',
            description: 'The id of the product to update' 
           }
        */
        const currentId = +req.params.id
        const item = await productRepository.findOne({ where: { id: currentId } })
        const { popular } = req.body;
        const updatedItem = await productRepository.update(item!.id, { popular: popular })
        res.status(200).json({ updatedItem })
    } catch (error) {
        res.status(500).json({ error })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        /*
           #swagger.tags = ['Products']
           #swagger.summary = 'Remove a product'
           #swagger.parameters['id'] = { 
            in: 'path',
            description: 'The id of the product to remove' 
           }
        */
        const currentId = +(req.params.id)
        const item = await productRepository.findOne({ where: { id: currentId } })
        await productRepository.remove(item!)
        res.status(200).send(`product removed successfully`)
    } catch (error) {
        res.status(500).json({ error })
    }
})


export default router