export default class ActionTransformer {
  targetType = null;
  data = null;
  methods = {};

  constructor(state, action, methodsOrTargetAction) {
    if (typeof methodsOrTargetAction === 'string') {
      this.targetType = methodsOrTargetAction;
    } else if (typeof methodsOrTargetAction === 'function') {
      this.transform = methodsOrTargetAction;
    } else {
      this.methods = methodsOrTargetAction;
    }
    this.data = this.collect(state, action.payload);
  }

  performTransformation = (state, dispatch) => {
    const transformedAction = this.transform(state, dispatch, this.data);

    if (!transformedAction) {
      return;
    }

    return dispatch(transformedAction);
  };

  collect = (state, action) => {
    return !this.methods.collect
      ? action.payload
      : this.methods.collect(state, action);
  };

  transform(state, dispatch, data) {
    return !this.methods.transform
      ? dispatch({ type: this.targetType, payload: data })
      : this.methods.transform(state, dispatch, data);
  }
}
