import express from 'express'
import { getStatistics } from '../controllers/stats.js'
import { ROLE } from '../constants/roles.js'
import { isLogin } from '../middleware/auth.js'

const router = express.Router()
const app = express()

//app.use(isLogin({ minRoleAccess: ROLE.ADMIN }))
router.get('/', getStatistics)


export default router