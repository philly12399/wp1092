import React, { useState } from "react";

export function Footer({length, left, handleClear, handleAll, handleActive, handleCompleted}) {
    return (
        <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">{left+" left"}</div>
            <ul className="todo-app__view-buttons">
                <button  onClick={handleAll}>All</button>
                <button  onClick={handleActive}>Active</button>
                <button  onClick={handleCompleted}>Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button onClick={handleClear} style={length==left? {display:"none"}:{}}>Clear Compeleted</button>
            </div>
        </footer>
    )
}