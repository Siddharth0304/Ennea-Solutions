import { useDispatch, useSelector } from 'react-redux'
import { deleteAll, deleteTodo, markAllDone, markAsDone } from '../features/todo/todoSlice';
import AddForm from './AddForm';
import styled from "styled-components"
import { Div } from './AddForm';

const Title = styled.h1`
    text-align: center;
    color: #FF7518;
    font-weight: 900;
    font-size: 2.5rem;
`;

const Ul = styled.ul`
    
    list-style-type: none;
    padding:0;
    margin:0;
`;

const Li = styled.li`
    
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    justify-content: space-between; 
    align-items: center; 
    &:hover {
        opacity: 0.8;
    }
`;

const TaskSpan = styled.span`
    text-decoration: ${props => (props.isDone ? "line-through" : "none")};
    text-transform: capitalize;
    cursor: pointer; 
    opacity: ${props => (props.isDone ? "0.8" : "1")}; //Using props feature of styled-components to provide dynamic styling
    flex-grow: 1; 
`;

const Icon = styled.i`
    color: #ff7518;
    cursor: pointer;
    font-size: 1.5rem;
   
`;

const Button=styled.button`
    font-size: 1.2rem;
    font-weight:600;
    border:none;
    background-color:#ff7518;
    color:#000;
    height : 2.8rem;
    border-radius:30px;
    margin-top:3%;    
    display:${props=>(props.isPresent>0?"block":"none")};  //Using props feature of styled-components to provide dynamic styling
    cursor:pointer;  
`;

export default function Todo() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch(); //used to call the functions defined in reducers

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));//calling the functions defined in reducers
    };

    const handleMark = (id) => {
        dispatch(markAsDone(id)); //calling the functions defined in reducers
    };

    const handleAllMark = () => {
        dispatch(markAllDone()); //calling the functions defined in reducers
    };

    const handleAllDelete=()=>{
        dispatch(deleteAll()); //calling the functions defined in reducers
    }
    

    return (
        <>
            <Title>Todo List</Title>
            <AddForm />
            <br />
            <Ul>
                {todos.map((todo) => {
                    return (
                        <Div key={todo.id}>
                            <Li>
                                <TaskSpan
                                    isDone={todo.isDone}
                                    onClick={() => handleMark(todo.id)}
                                >
                                {todo.task}
                                </TaskSpan>
                                <Icon
                                    className="fa-solid fa-circle-xmark"
                                        onClick={() => handleDelete(todo.id)}
                                />    
                            </Li>
                        </Div>
                    );
                })}
            </Ul>
            <Div>
                <Button onClick={()=>handleAllMark()} isPresent={todos.length}>Mark All Done</Button>&nbsp;&nbsp;
                <Button onClick={()=>handleAllDelete()} isPresent={todos.length}>Delete All</Button>
            </Div>
        </>
    );
}
