// import { Router } from 'express'
// import { User } from '../Entities/user'

// const router = Router()
// //Post a new user
// router.post('/', async (req, res) => {
//     try {
//         const { name,
//             mobile,
//             address,
//             city
//         } = req.body
//         const newUser = User.create({
//             name,
//             mobile,
//             address,
//             city
//         })
//         await User.save(newUser)
//         res.json({ newUser })
//     }
//     catch (error) {
//         res.status(500).json({ error })
//     }
// })
// //Get a user
// router.get('/:id', async (req,res)=>{
//     const id = +req.params.id
//     const user = User.findOne({where:{id:id}})
//     res.json({user})
// })

// export default router