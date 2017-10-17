import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
	path: 'pomodoro',
	getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Pomodoro = require('./containers/PomodoroContainer').default;
      const reducer = require('./modules/pomodoro').default;

      injectReducer(store, { key: 'pomodoro', reducer });

      cb(null, Pomodoro);

    }, 'pomodoro');
  }
});
