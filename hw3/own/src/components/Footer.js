import React, { Component } from "react";

class TodoFooter extends Component{
    constructor(props){
        super(props);
        this.state = {realnum : 0};
    }
    render(){
        return(
            <footer class="todo-app__footer" id="todo-footer">
                <div class="todo-app__total">{this.state.realnum} left</div>
                <ul class="todo-app__view-buttons">All</ul>
                <div class="todo-app__clean">clear completed</div>
            </footer>   
        );
    }
}
export default TodoFooter;
