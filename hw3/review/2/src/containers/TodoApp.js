import React, { Component } from "react";
import Header from "../components/Header";
import {Main} from "../components/Main";
// import {Footer} from "../components/Main";




function TodoApp() {
    return (
        <>
            <Header text="todos"/>
            <Main />
            {/* <Footer /> */}
        </>
    );
}

export default TodoApp;
