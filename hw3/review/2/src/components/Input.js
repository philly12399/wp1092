import React, { useState } from "react"


export function Input({newItem, onInputChange, onEnter}) {
    return (
        <input className="todo-app__input" placeholder="What needs to be done?" onChange={onInputChange} onKeyDown={onEnter} value={newItem}></input>

    );
} 