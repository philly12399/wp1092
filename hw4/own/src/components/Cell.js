import React, { Component } from "react";
class Cell extends Component {
    constructor(props) {
      super(props);
      //this.ind_i:0;
      //this.ind_j:0; 
      this.state = {content:""};
      s =  this.props.ind_j + this.props.ind_i.toString(); 
      this.setState((state) => ({ content : s}));
    }
    render() {
      return (
        <input type="text" value = {this.state.content} />
      );
    }
  }
export default Table;

