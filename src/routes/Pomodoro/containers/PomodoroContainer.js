import { connect } from 'react-redux';
import { updateSetting, startStopTimer, clearTimer, tickTimer } from '../modules/pomodoro';

import Pomodoro from '../components/Pomodoro';

let interval = null;

const mapDispatchToProps = {
  updateSetting,
  startStopTimer : () => (
    (dispatch, getState) => {
      dispatch(startStopTimer());

      const state = getState();
      clearInterval(interval);
      if (state.pomodoro.timer.ticking) {
        interval = setInterval(() => {
          dispatch(tickTimer());
        }, 1000);
      }
    }
  ),
  clearTimer : () => (
    (dispatch, getState) => {
      clearInterval(interval);
      dispatch(clearTimer());
    }
  )
};

const mapStateToProps = (state) => ({
  settings : state.pomodoro.settings,
  timer : state.pomodoro.timer
});

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
