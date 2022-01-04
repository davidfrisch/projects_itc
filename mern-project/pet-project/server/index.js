import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import petRoutes from './routes/pet.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import statsRoutes from './routes/stats.js'
import cookieParser from 'cookie-parser'
import { isLogin } from './middleware/auth.js'
import { ROLE } from './constants/roles.js'
import { transaction } from './middleware/transaction.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: '10MB' }))
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(cookieParser())
app.use(isLogin(ROLE.VISITOR))
app.use(transaction)

app.use('/', authRoutes)
app.use('/pet', petRoutes)
app.use('/user', userRoutes)
app.use('/stats', statsRoutes)



const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, ignoreUndefined: true  })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.log(err))

