import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from 'redux/modules/todos/selectors';
import { attemptSwapTodo } from 'redux/modules/todos/actions';
import AddTodo from 'containers/add_todo';
import Todo from 'containers/todo';
import Card from 'components/card';
import styles from './default.module.scss';
// import Draggable from 'draggable';

class Todos extends Component {
  onDrag = (mutation = [0, 0]) => {
    const [src, dst] = mutation;
    this.props.attemptSwapTodo(src, dst);
  };

  render() {
    const { entries } = this.props;
    return (
      <section className={styles.container}>
        <Card header="Todos" className={styles.inner} as="div">
          <AddTodo />
          {/*
            <Draggable.Group
              disableRootEvents
              as="ol"
              className="todos"
              onChange={this.onDrag}
            >
            */}
          <ol>
            {entries.map(({ value, done }) => (
              /*
                <Draggable.Target key={value} as="li">
                  {({ eventHandlers, targetActive }) => (
                    <Todo
                      active={targetActive}
                      value={value}
                      done={done}
                      key={value}
                      onMouseDown={eventHandlers.onPanStart}
                    />
                  )}
                </Draggable.Target>
                */
              <Todo key={value} value={value} done={done} />
            ))}
            {/*
            </Draggable.Group>*/}
          </ol>
        </Card>
      </section>
    );
  }
}

export default connect(
  state => ({
    entries: getTodos(state),
  }),
  { attemptSwapTodo }
)(Todos);
