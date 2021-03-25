import React, { Component } from "react";

class TodoFooter extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    handleFilter = (f)=>{
        this.props.changefilter(f);
    }
    handleClear = () => {
        this.props.changeclear(1);
        //this.props.changeclear(0);
    }
    render(){
        var hide="";
        if((this.props.compNum+this.props.todoNum) ==0) hide="none";
        var hideb="";
        if((this.props.compNum) ==0) hideb="none";
        return(
            <footer class="todo-app__footer" id="todo-footer" style={{display:hide}}>
                <div class="todo-app__total">{this.props.todoNum} left</div>
                <ul class="todo-app__view-buttons">
                    <button onClick = {()=>this.handleFilter("ALL")}>All</button>
                    <button onClick = {()=>this.handleFilter("ACT")}>Active</button>
                    <button onClick = {()=>this.handleFilter("COMP")}>Completed</button>
                </ul>
                <div class="todo-app__clean">
                    <button  style={{display:hideb}} onClick = {()=>this.handleClear()}>Clear completed</button>
                </div>
            </footer>   
        );
    }
}
export default TodoFooter;
