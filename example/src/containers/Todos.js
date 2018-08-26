import React from 'react';
import { connect } from 'react-redux';
import { getTodos } from 'redux/modules/todos/selectors';
import AddTodo from './AddTodo';
import Todo from './Todo';

const Todos = ({ entries }) => (
  <div className="todos-container">
    <AddTodo />
    <ol className="todos">
      {entries.map(({ value, done }) => (
        <Todo value={value} done={done} key={value} />
      ))}
    </ol>
  </div>
);

export default connect(state => ({
  entries: getTodos(state),
}))(Todos);
