import React, { Fragment } from 'react';
import { types } from 'redux/modules';

import { transformers } from 'redux/modules';

export default () => (
  <section className="legend">
    <h2 className="header">Legend</h2>
    <table className="panel">
      <tbody>
        <tr>
          <th className="legend-header">Action Type</th>
          <th className="legend-header">Undoable</th>
        </tr>

        {types.map(type => (
          <tr key={type}>
            <td className="legend-row">{type}</td>
            <td className="legend-row">
              {!!transformers[type] ? 'True' : 'False'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
