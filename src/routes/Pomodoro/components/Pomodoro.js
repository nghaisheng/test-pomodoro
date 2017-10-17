import React from 'react';
// import PropTypes from 'prop-types';

export const Pomodoro = ({ settings, timer, updateSetting, startStopTimer, clearTimer }) => (
	<div>
		<h1>Pomodoro Timer</h1>
		<div className='row'>
			<div className='col-md-3'>
				<label className='control-label'>Session (min)</label>
				<input type='number' className='form-control' value={settings.session} onChange={(e) => updateSetting('session', e.target.value)} placeholder='Session'/>
			</div>
			<div className='col-md-3'>
				<label className='control-label'>Break (min)</label>
				<input type='number' className='form-control' value={settings.break} onChange={(e) => updateSetting('break', e.target.value)} placeholder='Break'/>
			</div>
			<div className='col-md-3'>
				<label className='control-label'>Long Break (min)</label>
				<input type='number' className='form-control' value={settings.longBreak} onChange={(e) => updateSetting('longBreak', e.target.value)} placeholder='Long Break'/>
			</div>
			<div className='col-md-3'>
				<label className='control-label'>Long Break After</label>
				<input type='number' className='form-control' value={settings.cycle} onChange={(e) => updateSetting('cycle', e.target.value)} placeholder='Cycle Long Break'/>
			</div>
		</div>
		<div style={{ margin: '0 auto' }}>
			<h1>{timer.display.minutes}:{timer.display.seconds}</h1>
			<p>{timer.currentTimer == 'session' ? 'SESSION' : 'BREAK'}</p>
		</div>
		<div style={{ margin: '0 auto' }}>
			<button className={'btn btn-'+(timer.ticking ? 'danger' : 'primary')} onClick={startStopTimer}>
	      {timer.ticking ? 'Stop' : 'Start'}
	    </button>
	    {' '}
	    <button className='btn btn-secondary' onClick={clearTimer}>
	      Clear
	    </button>
		</div>
	</div>
)
// Pomodoro.propTypes = {
//   settings: PropTypes.object.isRequired,
//   timer: PropTypes.object.isRequired,
//   updateSetting: PropTypes.func.isRequired
// };

export default Pomodoro
