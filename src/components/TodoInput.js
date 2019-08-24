import React, { PureComponent } from 'react'
import { addTodo } from '../redux/actions';

class TodoInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ''   // do not use void 0 for initialization here, throws error
        }
    }    

    handleChange = e => {
        this.setState({
            inputText: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.dispatch(addTodo(this.state.inputText));
        this.setState({
            inputText: ''
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='row'>            
                    <div className='col-sm-12 text-center'> 
                        <input 
                            type='text' 
                            value={this.state.inputText}
                            onChange = {this.handleChange}
                            autoComplete='off'
                            style={{padding: 5, marginRight: 5, verticalAlign: 'bottom'}}
                        />

                        <button className='btn btn-outline-primary'>Add</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default TodoInput;