import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState={
    todos:[{id:"abc",task:"Demo Task",isDone:false}] //declaring the initial values of state variable
}

export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            if(action.payload==="")
                return;
            const newTodo={
                id:nanoid(),
                task:action.payload,
                isDone:false
            }
            state.todos.push(newTodo);
        },
        deleteTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id!=action.payload);
        },
        markAsDone:(state,action)=>{
            for(let i=0;i<state.todos.length;i++){
                if(state.todos[i].id===action.payload)
                    state.todos[i].isDone=!state.todos[i].isDone;
            }
        },
        markAllDone:(state,action)=>{
            for(let i=0;i<state.todos.length;i++){
                    state.todos[i].isDone=true;
            }
        },
        deleteAll:(state,action)=>{
            state.todos=[];
        },
        
    }
})

export const {addTodo,deleteTodo,markAsDone,markAllDone,deleteAll}=todoSlice.actions;
export default todoSlice.reducer;