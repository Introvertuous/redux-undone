import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attemptAddTodo } from 'redux/modules/todos/actions';
import styles from './default.module.scss';

class AddTodo extends Component {
  state = {
    value: '',
  };

  onKeyDown = ev => {
    if (ev.key === 'Enter') {
      this.props.attemptAddTodo({ value: this.state.value });
    }
  };

  onChange = ev => {
    this.setState({ value: ev.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <input
        value={value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        className={styles.container}
        type="text"
        placeholder="What needs to get done?"
      />
    );
  }
}

export default connect(
  null,
  { attemptAddTodo }
)(AddTodo);
