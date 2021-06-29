import {dbMutation,dbClear, dbInitialize} from './Mutation'
import {getData } from './garenaAPIS'
var addDataFlow=async(name)=>{
   return await getData(name);
}
var getGames= async (summoner_name)=>{ 
    try{
        var matches = await addDataFlow(summoner_name);
    }
    catch(e){  
        if (e === "Error: The summoner name doesn't exist.") throw "Error: The summoner name doesn't exist."
        else if(e==="Error: The summoner has no match.") throw "Error: The summoner has no match."
        else if (e==="Error: The summoner name need to be exactly same.") throw "Error: The summoner name need to be exactly same.";
        throw "Error: Garena server down."
    } 

    try{
        //await dbMutation(summoner_name,[await getMatch("1936320920")])
        await dbMutation(summoner_name,matches);
        console.log("Mutation sucess.")
    } catch(e){
        if(e=== "Error: No data of this champion.") throw "Error: No data of this champion."
        else throw "Error: Mutaion error.";
    }  
    
}
export  {getGames,addDataFlow};