import React from 'react';
import { connect } from 'react-redux';
import { undo, redo } from '../../../../dist';
import UndoIcon from 'components/icons/Undo';
import RedoIcon from 'components/icons/Redo';
import styles from './default.module.scss';
import Card from 'components/Card';

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
