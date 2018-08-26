import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  attemptUpdateTodo,
  attemptRemoveTodo,
} from 'redux/modules/todos/actions';
import Toggle from 'components/Toggle';
import CloseIcon from 'components/icons/Close';

class Todo extends Component {
  onToggleClick = (id, done) => {
    this.props.attemptUpdateTodo(id, done);
  };

  onRemoveClick = () => {
    const { value } = this.props;
    this.props.attemptRemoveTodo(value);
  };

  render() {
    const { done, value } = this.props;

    return (
      <li className="todo">
        <label
          className="todo-text"
          style={{
            textDecoration: done && 'line-through',
          }}
        >
          {value}
        </label>
        <CloseIcon className="icon" onClick={this.onRemoveClick} />
        <Toggle id={value} checked={done} onClick={this.onToggleClick} />
      </li>
    );
  }
}

export default connect(
  null,
  { attemptUpdateTodo, attemptRemoveTodo }
)(Todo);
