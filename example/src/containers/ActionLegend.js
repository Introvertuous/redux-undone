import React from 'react';
import classnames from 'classnames';
import { types } from 'redux/modules';

import { transformers } from 'redux/modules';

export default () => (
  <section className={classnames(['panel', 'legend'])}>
    <table className="legend-table">
      <tbody>
        <tr>
          <th className="legend-header">Action</th>
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
