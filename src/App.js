import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { connect } from 'react-redux';

// wrapping component inside connect, gives access to dispatch
export class App extends Component {
  render() {
    const { todos } = this.props;
    return (
      <>
        <div className='jumbotron text-center'>
          <h1>ToDo App Page</h1>
          <p>Resize this responsive page to see the effect!</p> 
        </div>

        <div className="container">
            <TodoInput dispatch={this.props.dispatch} />
            <TodoList dispatch={this.props.dispatch} todos={todos} />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(App);
