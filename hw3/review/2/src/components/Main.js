import React, { useState } from "react";
import { Input } from "./Input";
import { TodoList } from "./TodoList";
import { Footer } from "./Footer"


export function Main() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [count, setCount] = useState(0);
    const [left, setLeft] = useState(0);
    const [mode, setMode] = useState(0)

    const handleChange = ({target}) => {
        setNewItem(target.value);
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter') {
            if(newItem==="")
                return
            setItems((prev) => {
                return [...prev, {content: newItem, id: count, fin: false}]
            });
            setNewItem("");
            setCount(prev => prev + 1);
            setLeft(prev => prev + 1);
        }
    };

    const handleCheckbox = ({target}) => {
        if(target.checked) {
            setItems((prev) => prev.map(item => {
                if(item.id == target.id) {
                    item.fin = true;
                }
                return item;
            }))
            setLeft(prev => prev - 1);
        }
        else {
            setItems((prev) => prev.map(item => {
                if(item.id == target.id)
                    item.fin = false;
                return item;
            }))
            setLeft(prev => prev + 1);
        }
    }

    const handleX = ({target}) => {
        items.forEach(item => {
            if(item.id == target.id && item.fin == false) {
                setLeft(prev => prev - 1);
            }
        })
        setItems((prev) => 
            prev.filter(item => 
                item.id != target.id)
        )

    }

    const handleClear = () => {
        setItems([]);
        setNewItem("");
        setLeft(0);
    }

    const handleAll = () => {
        setMode(0);
    }

    const handleActive = () => {
        setMode(1);
    }

    const handleCompleted = () => {
        setMode(2);
    }

    if(items.length > 0) {
        return (
            <section className="todo-app__main">
                <Input newItem={newItem} onInputChange={handleChange} onEnter={handleEnter} />
                <TodoList allItems={items} handleCheckbox={handleCheckbox} handleX={handleX} mode={mode}/>
                <Footer length={items.length} left={left} handleClear={handleClear} handleAll={handleAll} handleActive={handleActive} handleCompleted={handleCompleted}/>
            </section>
        );
    }
    else {
        return (
            <section className="todo-app__main">
                <Input newItem={newItem} onInputChange={handleChange} onEnter={handleEnter} />
                <TodoList  allItems={items} handleCheckbox={handleCheckbox} handleX={handleX}/>
            </section>
        );
    }
}