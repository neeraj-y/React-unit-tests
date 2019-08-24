import { ADD_TODO, REMOVE_TODO, TOGGLE_COMPLETED } from './actionTypes';

const addTodo = text => {
    return {
        type: ADD_TODO,
        text
    }
}

const removeTodo = id => {
    return {
        type: REMOVE_TODO,
        id
    }
}

const toggleComplete = id => {
    return {
        type: TOGGLE_COMPLETED,
        id
    }
}

export { addTodo, removeTodo, toggleComplete };