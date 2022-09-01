import { Router } from 'express'
import { User } from '../Entities/user'
import bcrypt from 'bcrypt'

const router = Router()
// //Post a new user
router.post('/signup', async (req, res) => {
    try {
        const { name,
            email,
            password,
            mobile,
            address,
            city
        } = req.body


        //brcypt.hash is an async function, need await, returns promise<>
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            address,
            city
        })
        await newUser.save()
        res.json({ newUser })
    }
    catch (error) {
        res.status(500).json({ error })
    }
})

//Get a user
router.get('/:id', async (req, res) => {
    const id = +req.params.id
    const user = User.findOne({ where: { id: id } })
    res.json({ user })
})

export default router