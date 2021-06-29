import mongoose from 'mongoose';
const Schema = mongoose.Schema
const MatchSchema = new Schema({
  id:String,
  time:String,
  gamemap:String,
  gamemode:String,
  gametime:String,
  champions:[String],
  summoners:[String],
  order:[String],
  stats:[{
    "CHAMPIONS_KILLED":Number,"NUM_DEATHS":Number,
    "ASSISTS":Number,"TOTAL_DAMAGE_DEALT_TO_CHAMPIONS":Number,
    "GOLD_EARNED":Number,"MINIONS_KILLED":Number,"NEUTRAL_MINIONS_KILLED":Number,"LEVEL":Number
  }]

})
 export default mongoose.model('Match', MatchSchema);
