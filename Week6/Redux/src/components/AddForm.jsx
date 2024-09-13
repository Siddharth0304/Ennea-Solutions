import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import styled from "styled-components";

//Creating and exporting a div component with required styling and suing it in other components as well
export const Div=styled.div` 
    display:flex;
    flex-wrap:wrap;
    width: 100%;
    align-items : center;
    justify-content: center;
    
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  width : 70%;
  color: #000;
  background: papayawhip;
  border: none;
  border-radius: 30px;
  height : 1.5rem;
  font-size : 1.2rem;
  font-weight : 600;
`;

const Button=styled.button`
    font-size: 1.2rem;
    font-weight:600;
    border:2px solid #ff7518;
    border-radius:30px;
    background-color:#000;
    color:#ff7518;
    height : 2.8rem;
    &: hover{
        background-color: #ff7518;
        color:black;
        
    }
        
`


export default function AddForm() {
    const [task,setTask]=useState(""); //Using state variable to take input
    const dispatch=useDispatch(); //used to call the functions defined in reducers
    const inputRef = useRef(null); //Used in order to make input active on mouse over or when in focus

    const handleInputChange=(event)=>{
        setTask(event.target.value) //Used to change state when given input
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        dispatch(addTodo(task));
        setTask(""); //Resetting the input form to null or clearing the input form
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Div isPresent={1}>
                <Input 
                    type="text" 
                    placeholder="Enter Task" 
                    value={task} 
                    onChange={handleInputChange}
                    ref={inputRef} 
                    onMouseEnter={() => {
                        inputRef.current.focus(); 
                    }}
                    required
                /> 
                <Button style={{cursor:"pointer"}} >Add Task</Button>
            </Div>
            
        </form>
    </>
  )
}
