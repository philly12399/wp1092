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
    var e=this.props.route_data.length;
    var items = this.props.route_data.map((x,index)=>{
      if(index===e-1) return  <Station dd={x} end={1}/>
      else if (index ===0) return  <Station dd={x} end={-1}/>
      else  return <Station dd={x} end={0}/>
    }
   
    );
    console.log(items)
    return (
      <div className="route-graph-container">
        {
           items
          // generate many stations
          // use <Station /> with your own customized parameters
          // coding here ...
        }
      </div>
    )
  }
}

export default RouteGraph
