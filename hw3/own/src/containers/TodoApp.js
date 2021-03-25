import React, { Component } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {todoList : [], todoNum : 0, realNum : 0};
    }
    render() {
        return (
            <>
                <Header text="todos" />
                <Main todoList={this.state.todoList} todoNum = {this.state.todoNum} realNum = {this.state.realNum}/>
                <Footer/>
            </>
        );
    }
}

export default TodoApp;
