import React from 'react';
import Todos from 'containers/todos';
import Controls from 'containers/controls';
import Legend from 'containers/legend';
import History from 'containers/history';
import styles from './default.module.scss';

const Root = () => (
  <section className={styles.container}>
    <Controls />
    <Legend />
    <History />
    <Todos />
  </section>
);

export default Root;
