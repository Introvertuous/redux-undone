import React from 'react';
import { connect } from 'react-redux';
import { undo, redo } from '../../../dist';
import UndoIcon from 'components/icons/Undo';
import RedoIcon from 'components/icons/Redo';

const Controls = props => (
  <div className="controls">
    <UndoIcon className="icon" onClick={props.undo} />
    <RedoIcon className="icon" onClick={props.redo} />
  </div>
);

export default connect(
  null,
  { undo, redo }
)(Controls);
