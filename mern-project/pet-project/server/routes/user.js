import express from 'express'
import { getUserById, updateUserById, getUsers, getUserFullById, updateUserByIdAdmin } from '../controllers/user.js'
import { ROLE } from '../constants/roles.js'
import { isLogin } from '../middleware/auth.js'

const router = express.Router()
const app = express()

app.use(isLogin({ minRoleAccess: ROLE.CLIENT }))
router.get('/:id', getUserById)
router.put('/:id', updateUserById)


router.put('/admin/:id', isLogin({ minRoleAccess: ROLE.ADMIN }), updateUserByIdAdmin)
router.get('/:id/full', isLogin({ minRoleAccess: ROLE.ADMIN }), getUserFullById)
router.get('/', isLogin({ minRoleAccess: ROLE.ADMIN }), getUsers)


export default router