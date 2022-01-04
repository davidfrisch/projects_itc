import express from 'express'
import * as petController from '../controllers/pet.js'
import { ROLE } from '../constants/roles.js'
import { isLogin } from '../middleware/auth.js'


const router = express.Router()
const app = express()

//all url with /pet at the start
//id of the pet
router.get('/:id', petController.getPet)
router.get('/', petController.getPets)

app.use(isLogin({ minRoleAccess: ROLE.CLIENT }))
router.post('/:petId/adopt', petController.adoptPet)
router.post('/:petId/return', petController.returnPet)
router.post('/:petId/save', petController.savePet)
router.post('/:petId/delete', petController.deletePet)
router.get('/user/:id', petController.getPetsByUserId)

app.use(isLogin({ minRoleAccess: ROLE.ADMIN }))
router.post('/', petController.addPet)
router.put('/:petId', petController.editPet)



export default router