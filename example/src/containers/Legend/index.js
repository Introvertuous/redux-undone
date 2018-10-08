import React from 'react';
import { types } from 'redux/modules';
import Card from 'components/Card';
import { transformers } from 'redux/modules';
import styles from './default.module.scss';

export default () => (
  <Card className={styles.container} header="Legend" as="table">
    <tbody>
      <tr>
        <th className={styles.header}>Action Type</th>
        <th className={styles.header}>Undoable</th>
      </tr>

      {types.map(type => (
        <tr key={type}>
          <td className={styles.row}>{type}</td>
          <td className={styles.row}>
            {!!transformers[type] ? 'True' : 'False'}
          </td>
        </tr>
      ))}
    </tbody>
  </Card>
);
