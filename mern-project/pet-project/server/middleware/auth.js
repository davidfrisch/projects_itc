import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import { ROLE } from '../constants/roles.js'
dotenv.config()

export const isLogin = ({ minRoleAccess }) => (req, res, next) => {
    const token = req.cookies.access_token


    if (!token) {
        //forbidden acccess because not login
        req.userInfo = null
        if (ROLE.VISITOR < minRoleAccess) {
            res.status(400).json({ error: `Not permission need to be min role:${minRoleAccess}` })
            return
        }
    }
    try {
        const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userInfo = user
        const { role } = user

        if (!user || role < minRoleAccess) {
            res.status(400).json({ error: `Not permission need to be min role:${minRoleAccess}` })
            return
        }

    } catch (error) {
        //forbidden acccess because signatures does not match
        req.userInfo = null
    }
    next()
}
