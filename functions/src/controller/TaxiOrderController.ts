import {Response} from 'express'
import Request from '../types/RequestType'
import {db} from '../config/firebase'
import TaxiOrderType from '../types/TaxiOrderType'

const addTaxiOrder = async (req: Request, res: Response) => {
    const {
        directionFrom, directionTo,
        amount, clientPhoneNumber
    } = req.body
    try {
        const taxiOrder = db.collection('orders').doc()
        const taxiOrderObject = {
            id: taxiOrder.id,
            directionFrom,
            directionTo,
            amount,
            clientPhoneNumber,
        }
        taxiOrder.set(taxiOrderObject)

        res.status(200).send({
            status: 'success',
            message: 'taxi order added successfully',
            data: taxiOrderObject
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {

        const allOrders: TaxiOrderType[] = []
        const querySnapshot = await db.collection('orders').get()
        querySnapshot.forEach((doc: any) => allOrders.push(doc.data()))
        return res.status(200).json(allOrders)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getOrder = async (req: Request, res: Response) => {
    try {
        const doc = db.collection("orders").doc(req.params.orderId)
        const item = await doc.get()
        const response = item.data()
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateOrder = async (req: Request, res: Response) => {
    const {body: {directionFrom, directionTo, amount}, params: {orderId}} = req
    try {
        const order = db.collection('orders').doc(orderId)
        const currentData = (await order.get()).data() || {}
        const orderObject = {
            id: order.id,
            directionFrom: directionFrom || currentData.directionFrom,
            directionTo: directionTo || currentData.directionTo,
            amount: amount || currentData.amount,
        }
        await order.set(orderObject).catch(error => {
            return res.status(400).json({status: 'error', message: error.message})
        })
        return res.status(200).json({
            status: 'success',
            message: 'order updated successfully',
            data: orderObject
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params
    try {
        const order = db.collection('orders').doc(orderId)
        await order.delete().catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            })
        })
        return res.status(200).json({
            status: 'success',
            message: 'order deleted successfully',
        })
    }
    catch(error) { return res.status(500).json(error.message) }
}

export {addTaxiOrder, getAllOrders, getOrder, updateOrder, deleteOrder}