import mongoose from 'mongoose';
const Schema = mongoose.Schema
const SummonerSchema = new Schema({
  name: String,
  matches:[{type:mongoose.Types.ObjectId, ref: 'Match'}],
  champstats:Map
});
 export default mongoose.model('Summoner', SummonerSchema);
