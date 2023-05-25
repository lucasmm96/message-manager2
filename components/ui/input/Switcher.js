import { useState } from 'react';

import classes from '@/components/ui/input/Switcher.module.css';

function Switcher(props) {
  const [status, setStatus] = useState({ label: 'OFF', active: false });

  function onSwitcherHandler(event) {
    event.preventDefault();
    const active = !status.active;
    const label = active ? 'ON' : 'OFF';

    setStatus({ label: label, active: active });
    props.onSwitcherHandler(event);
  }

  return (
    <div id={props.id} className={classes.switchContainer}>
      <button
        className={`${classes.switch} ${status.active ? classes.active : ''}`}
        onClick={onSwitcherHandler}
      >
        <span className={classes.switchToggle}>{status.label}</span>
      </button>
    </div>
  );
}

export default Switcher;
