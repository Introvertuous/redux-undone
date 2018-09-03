import React from 'react';
import Todos from 'containers/Todos';
import Controls from 'containers/Controls';
import Legend from 'containers/Legend';
import History from 'containers/History';

const App = () => (
  <section className="container">
    <Controls />
    <Legend />
    <History />
    <Todos />
  </section>
);

export default App;
