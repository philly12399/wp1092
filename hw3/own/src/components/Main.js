import React, { Component } from "react";

class TodoMain extends Component {
    constructor(props){
        super(props);
        this.state = { todoList : [], todoNum : 0, realNum : 0};
        this.todoItem = class todoItem {
            constructor(Id,Detail){
                this.Id=Id;
                this.Detail=Detail;
                this.checked=0;
            }
        }
    }
    newItem = (Id,Detail)=>{
        return(
            <li class="todo-app__item">
                <div class="todo-app__checkbox">
                <input id={Id} type="checkbox" onClick={e=>this.handleCheck(e)}></input>
                <label for={Id} ></label>
                </div>
                <h1 class="todo-app__item-detail ">{Detail}</h1>
                <img src="./img/x.png" class="todo-app__item-x"></img>
            </li>
        );
    }
    handleCheck = (e)=>{
        var  clickedDetail=e.target.offsetParent.nextSibling;
        var  clickedId =e.target.id;
        if(this.state.todoList[clickedId].checked == 0){
            clickedDetail.classList.add('checked');
            this.state.todoList[clickedId].checked = 1;
        }
        else{
            clickedDetail.classList.remove('checked');
            this.state.todoList[clickedId].checked = 0;
        }
    }
    handleInput = (e) =>{
        if(e.key === "Enter" && e.target.value !== "" ){
            this.setState({ todoList : this.state.todoList.concat([new this.todoItem(this.state.todoNum,e.target.value)])});
            this.setState((state)=>({todoNum : state.todoNum +1}));
            this.setState((state)=>({realNum : state.realNum +1}));
            e.target.value="";
        }
    }
    render() {
        var items = this.state.todoList.map((e,index)=>this.newItem(index,e.Detail));
        return (
            <section class='todo-app__main'>
            <input class='todo-app__input' placeholder="What needs to be done?" onKeyPress={e => this.handleInput(e)}></input>
            <ul class='todo-app__list' id='todo-list'>
            {items}
            </ul>
            </section>
        );
    }
}

export default TodoMain;
