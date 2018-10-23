import React from 'react';
import { connect } from 'react-redux';
import { undo, redo } from '../../../../dist';
import UndoIcon from 'components/icons/undo';
import RedoIcon from 'components/icons/redo';
import Card from 'components/card';
import styles from './default.module.scss';

const Controls = props => (
  <Card as="div" className={styles.container}>
    <UndoIcon className={styles.icon} onClick={props.undo} />
    <RedoIcon className={styles.icon} onClick={props.redo} />
  </Card>
);

export default connect(
  null,
  { undo, redo }
)(Controls);
