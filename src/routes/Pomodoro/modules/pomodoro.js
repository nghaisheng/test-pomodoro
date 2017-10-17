import { combineReducers } from 'redux';
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const TIMER_START_STOP = 'TIMER_START_STOP';
export const TIMER_CLEAR = 'TIMER_CLEAR';
export const TIMER_TICK = 'TIMER_TICK';

// ------------------------------------
// Actions
// ------------------------------------

export function updateSetting(field, payload=0) {
  return {
    type: UPDATE_SETTING,
    field: field,
    payload: parseInt(payload)
  };
}

export function startStopTimer() {
  return {
    type: TIMER_START_STOP
  };
}

export function clearTimer() {
  return {
    type: TIMER_CLEAR
  };
}

export function tickTimer() {
  return {
    type: TIMER_TICK
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  updateSetting,
  startStopTimer,
  clearTimer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
function leadingZero(n) {
  return n < 10 ? '0' + n : n;
}

const getSecond = (minutes) => minutes*60;

const getTimerDisplay = (seconds) => ({
  minutes: Math.floor(seconds / 60),
  seconds: leadingZero(seconds % 60)
});

const ACTION_HANDLERS = {
  [UPDATE_SETTING] : (state, action) => {
    return {...state,
      settings: {...state.settings, [action.field]: action.payload}
    };
  },
  [TIMER_START_STOP] : (state, action) => {
    if (!state.timer.started) {
      let timer = getSecond(state.settings.session);
      return {...state, 
        timer: {...state.timer, 
          started: true, ticking: !state.timer.ticking,
          timer: timer, display: getTimerDisplay(timer)
        }
      };
    }
    return {...state, 
      timer: {...state.timer, started: true, ticking: !state.timer.ticking}
    };
  },
  [TIMER_CLEAR] : (state, action) => {
    let timer = getSecond(state.settings.session);
    return {...state, 
      timer: {...state.timer, 
        started: false, ticking: false, currentTimer: 'session', currentCycle: 1,
        timer: timer, display: getTimerDisplay(timer)
      }
    };
  },
  [TIMER_TICK] : (state, action) => {
    let timer = state.timer.timer-1;
    let currentCycle = state.timer.currentCycle;
    let currentTimer = state.timer.currentTimer;
    if (timer < 0) {
      if (currentTimer == 'session') {
        if (currentCycle % state.settings.cycle == 0) {
          currentTimer = 'longBreak';
        } else {
          currentTimer = 'break';
        }
      } else {
        currentTimer = 'session';
        currentCycle++;
      }
      timer = getSecond(state.settings[currentTimer]);
    }
    return {...state, 
      timer: {...state.timer, 
        timer: timer, currentCycle: currentCycle, 
        currentTimer: currentTimer, display: getTimerDisplay(timer)
      }
    };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const defaultSession = 25;

const initialState = {
  settings: {
    session: defaultSession,
    break: 5,
    longBreak: 15,
    cycle: 4
  },
  timer: {
    started: false,
    ticking: false,
    timer: getSecond(defaultSession),
    display: {
      minutes: defaultSession,
      seconds: '00'
    },
    currentTimer: 'session',
    currentCycle: 1
  }
};

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
