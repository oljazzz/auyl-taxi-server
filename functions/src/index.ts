import * as functions from "firebase-functions"
import * as express from 'express'
import { addTaxiOrder, getAllOrders, getOrder, updateOrder } from "./controller/TaxiOrderController"
import { addTaxiRide, getTaxiRide } from './controller/TaxiRideController'



const app = express()

app.get('/', (req, res) => res.status(200).send('Welcome to Aul-taxi!'))
app.post('/orders', addTaxiOrder)
app.get('/orders', getAllOrders)
app.get('/orders/:orderId', getOrder)
app.patch('/orders/:orderId', updateOrder)

app.post('/rides', addTaxiRide)
app.get('/rides/:rideId', getTaxiRide)



exports.app = functions.https.onRequest(app)