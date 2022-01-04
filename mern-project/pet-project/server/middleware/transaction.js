import TransactionModel from '../models/transaction.js'





const petTransaction = (req) => {
    const { method, originalUrl, params } = req
    const elementsInUrl = originalUrl.split('/')
    const lastPosition = elementsInUrl.length - 1
    let action = elementsInUrl[lastPosition]
    if (action === '') return

    const petId = elementsInUrl[lastPosition - 1]

    const { _id: userId } = req.userInfo || {_id : 'visitor'}
    let transaction = {}

    switch (method) {
        case 'GET':
            break;
        case 'POST':
            if (action === 'adopt') {
                action = req.body.newAdoptionStatus
            }

            transaction = {
                timestamp: new Date(),
                action,
                userId,
                petId,
            }

            try {
                TransactionModel.create(transaction)
            } catch (error) {
                console.log(error)
            }

        default:
            break
    }
}

const userTransaction = () => {}

export const transaction = ((req, res, next) => {

    if (req.originalUrl.includes('user')) {
        userTransaction(req)
    }


    if (req.originalUrl.includes('pet')) {
        petTransaction(req)
    }
    // if (req.method === 'POST') {
    //     console.log(req.originalUrl)
    //     console.log(req.method)
    //     console.log('------------------')
    // }


    next()
})
