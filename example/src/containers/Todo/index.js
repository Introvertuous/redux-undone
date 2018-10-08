import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  attemptUpdateTodo,
  attemptRemoveTodo,
} from 'redux/modules/todos/actions';
import Toggle from 'components/Toggle';
import CloseIcon from 'components/icons/Close';
import classnames from 'classnames';
import styles from './default.module.scss';

class Todo extends Component {
  onToggleClick = (id, done) => {
    this.props.attemptUpdateTodo(id, done);
  };

  onRemoveClick = () => {
    const { value } = this.props;
    this.props.attemptRemoveTodo(value);
  };

  onIconMouseDown(ev) {
    ev.stopPropagation();
  }

  render() {
    const { done, value, onMouseDown, active } = this.props;

    return (
      <li
        className={classnames(styles.container, { [styles.active]: active })}
        onMouseDown={onMouseDown}
      >
        <label
          className={classnames(styles.text, {
            [styles.textActive]: done,
          })}
        >
          {value}
        </label>
        <CloseIcon
          onClick={this.onRemoveClick}
          onMouseDown={this.onIconMouseDown}
        />
        <Toggle
          id={value}
          checked={done}
          onClick={this.onToggleClick}
          onMouseDown={this.onIconMouseDown}
        />
      </li>
    );
  }
}

export default connect(
  null,
  { attemptUpdateTodo, attemptRemoveTodo }
)(Todo);
