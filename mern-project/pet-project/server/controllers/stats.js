import PokemonModel from '../models/pokemon.js'
import UserModel from '../models/user.js'
import TransactionModel from '../models/transaction.js'

export const getStatistics = async (req, res) => {
    const stats = {}

    stats.favoritePets = await getFavoritePetsAll()
    stats.adoptedOrFosteredPets = await getAdoptedOrFosteredPetsFromTo()
    stats.returnedPets = await getReturnedPetsFromTo()
    stats.lastConnections = await getLastConnectedUsers()
    stats.lastTransactions = await getLastTransactions()
    stats.newUsers = await getNewUsersFromTo()

    res.send(stats)
}

async function getFavoritePetsAll() {
    const allPets = await PokemonModel.find({}, { _id: 1, name: 1, likeCounter: 1 }).sort({ 'likeCounter': 'descending' })
    return allPets
}

async function getAdoptedOrFosteredPetsFromTo(from = new Date('01/01/2020'), to = new Date()) {
    const allAdoptedOrFosteredPets = await TransactionModel.find(
        {
            $and: [
                { $or: [{ action: 'adopt' }, { action: 'foster' }] },
                { timestamp: { $gte: from, $lte: to } }
            ]
        }).sort({ timestamp: 'ascending' })
    return allAdoptedOrFosteredPets
}

async function getReturnedPetsFromTo(from = new Date('01/01/2020'), to = new Date()) {
    const allAdoptedOrFosteredPets = await TransactionModel.find(
        {
            $and: [
                { $or: [{ action: 'return' }] },
                { timestamp: { $gte: from, $lte: to } }
            ]
        }).sort({ timestamp: 'ascending' })
    return allAdoptedOrFosteredPets
}

async function getLastConnectedUsers(limit = null) {
    return await UserModel.find({}, { _id: 1, email: 1, lastConnection: 1, ip: 1, signUpDate: 1 }).sort({ 'lastConnection': 'descending' })

}

async function getLastTransactions(limit = null) {
    return await TransactionModel.find({}).sort({ 'timestamp': 'descending' })

}

async function getNewUsersFromTo(from = new Date('01/01/2020'), to = new Date()) {
    return await TransactionModel.find(
        {
            $and: [
                { action: 'signUp' },
                { timestamp: { $gte: from, $lte: to } }
            ]
        })
}




