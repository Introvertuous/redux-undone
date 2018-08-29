import React, { Fragment } from 'react';
import Todos from 'containers/Todos';
import Controls from 'containers/Controls';
import ActionLegend from 'containers/ActionLegend';

const App = () => (
  <Fragment>
    <Controls />
    <section className="container">
      <ActionLegend />
      <h2 className="header">Todos</h2>
      <Todos />
    </section>
  </Fragment>
);

export default App;
