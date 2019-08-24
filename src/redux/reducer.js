import { ADD_TODO, REMOVE_TODO, TOGGLE_COMPLETED } from './actionTypes';

// generate id for newly added todo, it's value will be highest among all ids available yet
const getId = (state) => {
    return state.todos.reduce((maxId, todo) => {
        return Math.max(maxId, todo.id)
    }, -1) + 1;
}

const initialState = {
    todos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [{
                    id: getId(state),
                    isCompleted: false,
                    text: action.text
                }, ...state.todos]
            });
            
        case REMOVE_TODO: 
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id)
            });

        case TOGGLE_COMPLETED:
            return Object.assign({}, state, {
                todos: state.todos.map(todo => {
                    if (todo.id === action.id) {
                        return { ...todo, isCompleted: !todo.isCompleted }
                    } 
                    return todo
                })
            });

        default:
            return state;
    }
}

export default reducer;