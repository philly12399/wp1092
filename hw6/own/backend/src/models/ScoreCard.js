// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
import mongoose from 'mongoose';

const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const scoreCardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  subject: {
    type: String,
    required: [true, 'Subject field is required.']
  },
  score: {
    type: Number,
    required: [true, 'Score field is required.']
  },
})
 export default mongoose.model('ScoreCard', scoreCardSchema);
