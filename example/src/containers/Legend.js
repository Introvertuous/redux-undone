import React, { Fragment } from 'react';
import classnames from 'classnames';
import { types } from 'redux/modules';

import { transformers } from 'redux/modules';

export default () => (
  <Fragment>
    <h2 className="header">Legend</h2>
    <table className={classnames(['panel', 'legend'])}>
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
  </Fragment>
);
