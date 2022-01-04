import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import UserModel from '../models/user.js'
import AuthModel from '../models/auth.js'
import TransactionModel from '../models/transaction.js'
import { genPassword } from '../utils/utils.js'
import { ROLE } from '../constants/roles.js'

dotenv.config()

export const isLoginOnRefresh = async (req, res) => {
    if (!req.userInfo) {
        res.status(200).json({ result: null })
        return
    }
    try {
        const user = await UserModel.findById(req.userInfo._id)
        res.status(200).json({ result: user })
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, phoneNumber } = req.body
    const emailToLowerCase = email.toLowerCase()
    try {
        const existingUser = await AuthModel.findOne({ emailToLowerCase })
        if (existingUser) return res.status(404).send({ email: "User already exists." })
        if (password !== confirmPassword) return res.status(404).send({ password: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12)
        const resultAuth = await AuthModel.create({ email: emailToLowerCase, password: hashedPassword, })
        const resultUser = await UserModel.create({ authId: resultAuth._id, email: emailToLowerCase, firstName, lastName, phoneNumber, bio: '', listOfPetsAdopted: [], listOfPetsSaved: [], listOfPetsFostered: [], role: ROLE.USER, lastConnection: new Date(), ip: req.ip, signUpDate: new Date() })

        TransactionModel.create({ timestamp: new Date(), ip: req.ip, action: 'signUp' })
        const token = jwt.sign({ user: resultUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })

        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ result: resultUser })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const emailToLowerCase = email.toLowerCase()

    try {
        const existingUser = await AuthModel.findOne({ email: emailToLowerCase })
        if (!existingUser) {
            return res.status(404).send({ email: "User doesn't exist or already signedUp with Google" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(404).send({ email: "Invalid credentials" })
        existingUser.password = undefined

        const dataUser = await UserModel.findOneAndUpdate({ authId: existingUser._id }, { lastConnection: new Date(), ip: req.ip }, { new: true })

        const token = jwt.sign({ user: dataUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })


        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ result: dataUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const signInWithGoogle = async (req, res) => {

    const { googleId, profileObj } = req.body
    const { email, givenName: firstName, familyName: lastName, imageUrl: picture } = profileObj
    const pictureWithBetterQuality = picture.replace("s96-c", "s384-c", true)
    const hashedPassword = await bcrypt.hash(genPassword(), 12)

    try {
        let googleUser = await UserModel.findOne({ email })
        if (!googleUser) {
            const resultAuth = await AuthModel.create({ email, password: hashedPassword, googleId })
            googleUser = await UserModel.create({ authId: resultAuth._id, email, firstName, lastName, phoneNumber: '', bio: '', picture: pictureWithBetterQuality, listOfPetsAdopted: [], listOfPetsSaved: [], listOfPetsFostered: [], role: ROLE.USER, ip: req.ip, lastConnection: new Date(), signUpDate: new Date() })
            TransactionModel.create({ timestamp: new Date(), ip: req.ip, action: 'signUp' })
        } else {
            await UserModel.findOneAndUpdate({ email }, { lastConnection: new Date() })
        }

        const token = jwt.sign({ user: googleUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })

        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ result: googleUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


export const logOut = async (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200).json({ message: 'Successfully logged out' })
}


