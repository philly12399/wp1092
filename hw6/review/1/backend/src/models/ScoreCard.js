import mongoose from 'mongoose';
const Schema = mongoose.Schema
const model = mongoose.model
// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number

const scoreCardSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name field is required']
    },
    subject: {
      type: String,
      required: [true, 'Subject field is required']
    },
    score: {
      type: Number,
      required: [true, 'Score field is required']
    },
})


export default model('ScoreCard', scoreCardSchema)