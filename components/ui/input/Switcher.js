import { useState } from 'react';

import classes from '@/components/ui/input/Switcher.module.css';

function Switcher(props) {
	const [status, setStatus] = useState({label: 'OFF', active: false});
	

	const switcherHandler = (event) => {
    event.preventDefault();
    const active = !status.active;
    const label = active ? 'ON' : 'OFF';
    
		setStatus({label: label, active: active});
		props.onSwitcherHandler(active);
	};
	return (
		<div id={props.id} className="switch-container">
			<button
				className={`${classes.switch} ${status.active ? classes.active : ''}`}
				onClick={switcherHandler}
			>
				<span className="switch-toggle">{status.label}</span>
			</button>
		</div>
	);
}

export default Switcher;
