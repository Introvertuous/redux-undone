import React, { Fragment, Component } from 'react';
import Card from 'components/card';
// import { history } from '../../../../dist';
import styles from './default.module.scss';

function Category({ header, entries = [] }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <li className={styles.header}>{header}</li>
      {entries.map(({ action }, index) => (
        <li key={`history-${header}-${index}`} className={styles.category}>
          {action.type}
        </li>
      ))}
    </Fragment>
  );
}

class History extends Component {
  componentDidMount() {
    /**
     * TODO: obviously we should not be triggering
     * rerender on an interval simply to ensure our history is
     * accurate...
     */
    setInterval(() => {
      this.forceUpdate();
    }, 100);
  }

  render() {
    const past = [];
    // history.getPast();
    const future = [];
    // history.getFuture();

    return (
      <Card className={styles.container} header="History" as="ol">
        <Category header="FUTURE" entries={future.reverse()} />
        <Category header="PAST" entries={past.reverse()} />
      </Card>
    );
  }
}

export default History;
