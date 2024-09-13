//Configuring the store that can hold all reducers in redux

import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

export const store=configureStore({
    reducer:todoReducer
})