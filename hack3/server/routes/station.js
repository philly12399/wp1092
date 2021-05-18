import Station from '../models/station'
const tidyUpData = (data, result) => {
  // process data from mongo and return correct form of data
  // the data form should be like this:
  // data = {
  //   R: [
  //     {
  //       station_id: 'R1',
  //       station_name: '象山',
  //       ...
  //     },
  //     {
  //       station_id: 'R2',
  //       station_name: '101/世貿中心',
  //       ...
  //     }
  //   ],
  //   G: [
  //     ...
  //   ]
  // }
  // coding here ...
  //console.log(data);
  var l=[];
  var cmp=function compare(a, b) {
    var as=a['station_type'].charCodeAt(0);
    var bs=b['station_type'].charCodeAt(0);
    if (as<bs) {
      return -1;
    }
    if (as>bs) {
      return 1;
    }
    if(as==bs){
      var ao=a['station_order'];
      var bo=b['station_order'];
      if (ao<bo) {
        return -1;
      }
      if (ao>bo) {
        return 1;
      }
    }
    // a 必須等於 b
    return 0;
  }
  data.sort(cmp);
  for(var d of data){
    if(result[d["station_type"]] ===undefined) result[d["station_type"]] = [];
    result[d["station_type"]].push(d);
  }
  return result
}

const calculate = (data, start, end) => {
  let startLine = start[0]
  let endLine = end[0]
  let startInd = parseInt(start.slice(1, start.length)) - 1
  let endInd = parseInt(end.slice(1, end.length)) - 1
  let intersection = data[startLine].filter(s => data[endLine].some(a => a.station_name === s.station_name))[0]
  let intersection_ano = data[endLine].filter(s => data[startLine].some(a => a.station_name === s.station_name))[0]
  let dis = 0

  if (startLine !== endLine && start === intersection) {  // if start from intersection
    startLine = endLine
    startInd = intersection_ano.station_order - 1
  }

  if (startInd > endInd && startLine === endLine) { // check end order > start order
    return -1
  }
  else if (endInd === startInd && startLine === endLine) { // check whether same station
    return 0
  }
  else if (startLine !== endLine && startInd === intersection.station_order - 1 && endInd === intersection_ano.station_order - 1) { // check whether intersection
    return 0
  }
  else if (startLine !== endLine && startInd < intersection.station_order - 1 && endInd < intersection_ano.station_order - 1) { // check invalid route passing through intersection (end with smaller station order)
    return -1
  }
  else if (startLine !== endLine && startInd > intersection.station_order - 1) { // check invalid route passing through intersection (begin beyond intersection)
    return -1
  }
  
  if (startLine === endLine) { // same line (R -> R or G -> G)
    for (let i = startInd; i < endInd; i++) {
      dis += data[startLine][i].distance_to_next
    }
    return dis
  }
  else { // R -> G or G -> R
    for (let i = startInd; i < intersection.station_order - 1; i++) {
      dis += data[startLine][i].distance_to_next
    }

    for (let i = intersection_ano.station_order - 1; i < endInd; i++) {
      dis += data[endLine][i].distance_to_next
    }

    return dis
  }
}

// 1st API
const GetStations = async (req, res) => {
  console.log("getstations");
  let data = []
  let result = {}

    // fetch data from mongo
    // coding here ...
    Station.find().exec((err, ress) =>{
      try{
        data = ress;
        tidyUpData(data,result);
        if (Object.keys(result).length) {
          // return correct response here ...
          res.status(200).send({
            message: 'success',
            data: result
          })
        }
        else {
          throw new Error('Something Wrong !')
        }
      }
      catch (err) {
        console.error(err.name + ' ' + err.message)
        // return correct response here ...
        res.status(403).send({
          message: 'error',
          data: []
        })
      }
    })  
}

// 2nd API
const CalculateDistance = async (req, res) => {
  let data = []
  let result = {}
  let answer = -1

  try {
    const start = '' // get parameter from frontend
    const end = '' // get parameter from frontend

    // fetch data from mongo
    // coding here ...
    
    result = tidyUpData(data, result)
    answer = calculate(result, start, end)

    if (Object.keys(result).length) {
      // return correct response here ...
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    // return correct response here ...
  }
}

export { GetStations, CalculateDistance }
