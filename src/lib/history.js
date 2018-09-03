const history = { past: [], future: [] };

export default {
  getPast: () => [...history.past],
  getFuture: () => [...history.future],
  pop: past => history[past ? 'past' : 'future'].pop(),
  push: (past, element) => history[past ? 'past' : 'future'].push(element),
  clearFuture: () => {
    history.future = [];
  },
};
