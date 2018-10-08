import React from 'react';
import Todos from 'containers/Todos';
import Controls from 'containers/Controls';
import Legend from 'containers/Legend';
import History from 'containers/History';
import styles from './default.module.scss';

const App = () => (
  <section className={styles.container}>
    <Controls />
    <Legend />
    <History />
    <Todos />
  </section>
);

export default App;
