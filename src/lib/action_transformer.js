export default class ActionTransformer {
  action = null;
  data = null;
  methods = {};

  constructor(action, methods) {
    this.action = action;
    this.methods = methods;
  }

  collect(oldState, newState) {
    this.data = this.methods.collect(oldState, newState, this.action.payload);
  }

  getTransform(state) {
    return this.methods.getTransform(state, this.data);
  }
}
