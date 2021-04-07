import React, {useState} from "react"


export function TodoList({allItems, handleCheckbox, handleX, mode}) {
    if(mode == 1) {
        return (
            <ul className="todo-app_list" id="todo-list"> 
                {allItems.filter(item => item.fin == false).map((item) => (
                    <li className="todo-app__item" key={item.id}>
                        <div className="todo-app__checkbox" >
                            <input type="checkbox" id={item.id} onChange={handleCheckbox} checked={item.fin}></input>  
                            <label htmlFor={item.id}></label>
                        </div>
                        <h1 className="todo-app__item-detail" style={item.fin?{textDecoration:" line-through", opacity: 0.5}:{}} >{item.content}</h1>
                        <img src="./img/x.png" className="todo-app__item-x" id={item.id} onClick={handleX}/>
                    </li>
                ))}
            </ul>
        )
    }
    
    else if(mode == 2) {
        return (
            <ul className="todo-app_list" id="todo-list"> 
                {allItems.filter(item => item.fin == true).map((item) => (
                    <li className="todo-app__item" key={item.id}>
                        <div className="todo-app__checkbox" >
                            <input type="checkbox" id={item.id} onChange={handleCheckbox} checked={item.fin}></input>  
                            <label htmlFor={item.id}></label>
                        </div>
                        <h1 className="todo-app__item-detail" style={item.fin?{textDecoration:" line-through", opacity: 0.5}:{}} >{item.content}</h1>
                        <img src="./img/x.png" className="todo-app__item-x" id={item.id} onClick={handleX}/>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <ul className="todo-app_list" id="todo-list"> 
            {allItems.map((item) => (
                <li className="todo-app__item" key={item.id}>
                    <div className="todo-app__checkbox" >
                        <input type="checkbox" id={item.id} onChange={handleCheckbox} checked={item.fin}></input>  
                        <label htmlFor={item.id}></label>
                    </div>
                    <h1 className="todo-app__item-detail" style={item.fin?{textDecoration:" line-through", opacity: 0.5}:{}} >{item.content}</h1>
                    <img src="./img/x.png" className="todo-app__item-x" id={item.id} onClick={handleX}/>
                </li>
            ))}
        </ul>
    )
}
