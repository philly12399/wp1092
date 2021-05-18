import React, { Component } from 'react'

class Station extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    var color;
    if(this.props.dd["station_type"] === "G") color ="green"
    else  if(this.props.dd["station_type"] === "B") color ="blue"
    else if(this.props.dd["station_type"] === "R") color ="red"
    else if(this.props.dd["station_type"] === "O") color ="orange"
    var a="s-"+this.props.dd["station_id"]
    var b="l-"+this.props.dd["station_id"]
    var c=this.props.dd["station_name"]
    var e=this.props.dd["station_id"]
    if(this.props.end===1)
    return (
      <div className="station-line-container">
        <div id={a} className="station-and-name" onClick={this.getStations}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle end "+color }>{e}</div>
          <div className={"station-name "}>{c}</div>
        </div>
      </div>
    )
    else if(this.props.end===-1)
    return (
      <div className="station-line-container">
        <div id={a} className="station-and-name" onClick={this.getStations}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle end "+color }>{e}</div>
          <div className={"station-name "}>{c}</div>
        </div>
        <div id={b} className={"line "+color}></div> {/* you should add id to attributes */}
      </div>
    )
    else 
    return (
      <div className="station-line-container">
        <div id={a} className="station-and-name" onClick={this.getStations}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle "+color}>{e}</div>
          <div className={"station-name "}>{c}</div>
        </div>
        <div id={b} className={"line "+color}></div> {/* you should add id to attributes */}
      </div>
    )
  }
}

export default Station
