import React, { Fragment } from 'react';
import Todos from 'containers/Todos';
import Controls from 'containers/Controls';
import Legend from 'containers/Legend';
import History from 'containers/History';

const App = () => (
  <section className="container">
    <Controls />
    <div className="left-panel">
      <Legend />
      <History />
    </div>
    <div className="right-panel">
      <h2 className="header">Todos</h2>
      <Todos />
    </div>
  </section>
);

export default App;
