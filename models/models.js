import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String, 
    enum: ['American', 'Southwest', 'United'],
    required: true
  },
  airport: {
  type: String, 
  required: true,
  enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
  default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10, max: 9999
   },
   departure: {
    type: Date,
    required: true,
   },})

const Flights = mongoose.model('Flight', flightSchema)

export {
  Flight
}