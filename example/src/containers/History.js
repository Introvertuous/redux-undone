import React, { Fragment, Component } from 'react';
import { history } from '../../../dist';

function Category({ header, entries = [] }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <li className="history-header">{header}</li>
      {entries.map(({ action }, index) => (
        <li key={`history-${header}-${index}`} className="history-entry">
          {action.type}
        </li>
      ))}
    </Fragment>
  );
}

export default class History extends Component {
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
    const past = history.getPast();
    const future = history.getFuture();

    return (
      <section className="history">
        <h2 className="header">History</h2>
        <ol className="panel">
          <Category header="FUTURE" entries={future.reverse()} />
          <Category header="PAST" entries={past.reverse()} />
        </ol>
      </section>
    );
  }
}
