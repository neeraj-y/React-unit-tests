import React, { memo, useState } from 'react';
import { removeTodo, toggleComplete } from '../redux/actions';

const styles = {
    liStyle: { display: 'flex' },
    pStyle: { flexGrow: 1 },
    btnStyle: { marginRight: 5 }
}

const TodoList = (props) => {
    const { todos, dispatch } = props; 
    const [ modalVisible, setModalVisibility ]  = useState(false);
    const [ modalData, setModalData ] = useState({id: 0, text: ''});

    function openModal(data) {
        console.log('Inside modalOpen -- modalVisible => ', modalVisible, ' :: modalData => ', modalData);
        setModalVisibility(true);
        setModalData(data);
    }

    function deleteTodo(idx) {
        dispatch(removeTodo(idx));
    }

    function toggleCompleted(idx) {
        dispatch(toggleComplete(idx));
    }

    return (
        <>
        { !todos ? <div>Loading</div> : 
            <>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{modalData.id}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div className="modal-body">{modalData.text}</div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <ul className='col-12 list-group list-group-flush' style={{marginTop: 15}}>
                        {todos.map(todo => {
                            return (                        
                                <li key={todo.id} className='list-group-item' style={styles.liStyle}>
                                    <p style={styles.pStyle} className={todo.isCompleted ? 'completed' : ''}>{todo.text}</p>
                                    <button disabled={todo.isCompleted} onClick={() => toggleCompleted(todo.id)} className='btn btn-outline-primary' style={styles.btnStyle}>{todo.isCompleted ? 'Completed': 'Complete'}</button>
                                    <button onClick={() => openModal(todo)} data-toggle='modal' data-target='#exampleModalCenter' className='btn btn-outline-primary' style={styles.btnStyle}>Update</button>
                                    <button onClick={() => deleteTodo(todo.id)} className='btn btn-outline-danger' style={styles.btnStyle}>Delete</button>
                                    
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        }
        </>
    )
}

export default memo(TodoList);