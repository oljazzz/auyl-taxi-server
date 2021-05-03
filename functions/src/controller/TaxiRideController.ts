import { Response } from 'express'
import Request from '../types/TaxiRideRequest'
import { db } from '../config/firebase'

const addTaxiRide = async (req: Request, res: Response) => {
    const {rideEndTime, taxiOrderId, rideStatus } = req.body
    try {
        const taxiRide = db.collection('rides').doc()
        const taxiRideObject = {
            id: taxiRide.id,
            rideStartTime: Date.now(),
            rideEndTime,
            taxiOrderId,
            rideStatus,
        }
        taxiRide.set(taxiRideObject)

        res.status(200).send({
            status: 'success',
            message: 'taxi ride started successfully',
            data: taxiRideObject
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getTaxiRide = async (req: Request, res: Response) => {
    try {
        const doc = db.collection('rides').doc(req.params.rideId)
        const item = await doc.get()
        const response = item.data()
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export { addTaxiRide, getTaxiRide }