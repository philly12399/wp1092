import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ChampionSchema = new Schema({
  name: String,
  property:{    
    match_num:Number,
    win_num: Number, 
    kill: Number, 
    death: Number, 
    assist: Number, 
    damage: Number, 
    gold: Number, 
    minion: Number 
  },
  versus:Map
})
 export default mongoose.model('Champion', ChampionSchema);
