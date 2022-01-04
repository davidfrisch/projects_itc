import express from 'express'
import { signIn, signUp, logOut, isLoginOnRefresh, signInWithGoogle } from '../controllers/auth.js'
import { ROLE } from '../constants/roles.js'
import { isLogin } from '../middleware/auth.js'

const router = express.Router()

router.get('/logIn', isLoginOnRefresh)
router.post('/signIn', signIn)
router.post('/signInWithGoogle', signInWithGoogle)
router.post('/signUp', signUp)
router.get('/logout', isLogin({ minRoleAccess: ROLE.CLIENT }), logOut)

export default router