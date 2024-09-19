import React, { useRef, useState } from 'react'
import {app} from './Pages/Config';
import { addDoc,collection,getFirestore } from 'firebase/firestore';

const App = () => {
  const db = getFirestore(app);
  const [todo,setTodo] = useState([]);
  const input= useRef();

  const AddTodo = async (e) => {
    e.preventDefault();
    const inputval = input.current.value
    todo.push(inputval)
    setTodo([...todo]);
    // console.log(todo)
    try{
    const docref = await addDoc(collection(db,"todos"),{
      todo: inputval,
    })
  } catch(error){
    console.log(error);
  }
  } 

  

  const DeleteTodo = (index) => {
    todo.splice(index,1);
    setTodo([...todo]);
  }
  
  const EditTodo = (index) => {
    const editedVal = prompt("enter value");
    todo.splice(index , 1 , editedVal);
    setTodo([...todo]);

  }


  return (
    <>
    <div className="Container">
    <h1 className="text-center">Todo App</h1>
    <form onSubmit={AddTodo}>
      <input className="Input" type="text" placeholder="enter todo" ref={input} />
      <button className="bt22" type="submit">Click</button>
    </form>
    <ul>
      {/* key ma index dena is not a good practice */}
      {todo.length>0 ? todo.map((item , index)=>{
        return <div key={index}>
          <li >{item}</li>
          <button className="bt22" onClick={()=> DeleteTodo(index)}>Delete</button>
          <button className="bt22" onClick={()=> EditTodo(index) }>Edit</button>
          {/* <button type="button" className="btn btn-primary">Primary</button> */}
        </div>
      }): <p>No Todo is in the list ! </p>}
    </ul>
    </div>
    </>
  )
}

export default App