import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from 'redux/modules/todos/selectors';
import { attemptSwapTodo } from 'redux/modules/todos/actions';
import AddTodo from './AddTodo';
import Todo from './Todo';
// import Draggable from 'draggable';

class Todos extends Component {
  onDrag = (mutation = [0, 0]) => {
    const [src, dst] = mutation;
    this.props.attemptSwapTodo(src, dst);
  };

  render() {
    const { entries } = this.props;
    return (
      <section className="todos-out">
        <div className="todos-in">
          <h2 className="header">Todos</h2>
          <div className="panel">
            <AddTodo />
            {/*
            <Draggable.Group
              disableRootEvents
              as="ol"
              className="todos"
              onChange={this.onDrag}
            >
            */}
            <ol className="todos">
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
                <Todo key={value} value={value} done={done} key={value} />
              ))}
              {/*
            </Draggable.Group>*/}
            </ol>
          </div>
        </div>
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
