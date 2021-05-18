import React, { Component } from 'react'
import Station from './station'

class RouteGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const data = this.props.route_data
    console.log("123")
    return (
      <div className="route-graph-container">
        {
           this.props.route_data.map(x=>{<Station dd={x}/>})  
          // generate many stations
          // use <Station /> with your own customized parameters
          // coding here ...
        }
      </div>
    )
  }
}

export default RouteGraph
