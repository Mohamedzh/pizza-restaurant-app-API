import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    try {
        res.send("server working on vercel")
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
module.exports = router