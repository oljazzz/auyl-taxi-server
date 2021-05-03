import TaxiOrderType from "./TaxiOrderType";

type Request = {
    body: TaxiOrderType,
    params: {orderId: string}
    
}
export default Request