import classes from '@/components/ui/FormInput.module.css';

import InputLabel from '@/components/ui/input/InputLabel';
import TextInput from '@/components/ui/input/TextInput';
import Switcher from '@/components/ui/input/Switcher';

function FormInput(props) {
  function onChangeHandler(event) {
    props.onChangeHandler(event);
  }

  function onSwitcherHandler(event) {
    event.preventDefault();
    props.onSwitcherHandler(event);
  }

  function onBlurHandler(event) {
    props.onBlurHandler(event);
  }

  return (
    <div className={classes.group}>
      {props.type !== 'url' && (
        <InputLabel htmlFor={props.name} label={props.label} />
      )}
      {props.type === 'url' && (
        <InputLabel
          htmlFor={props.name}
          href={props.href}
          label={props.label}
          type={props.type}
          value={props.value}
        />
      )}
      {props.type !== 'switcher' && (
        <>
          <TextInput
            id={props.name}
            type={props.type}
            name={props.name}
            value={props.value || ''}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
          />
        </>
      )}
      {props.type === 'switcher' && (
        <Switcher id={props.name} onSwitcherHandler={onSwitcherHandler} />
      )}
      {props.required && !props.valid && props.blur && (
        <span className={classes.error}>This field is required</span>
      )}
    </div>
  );
}

export default FormInput;
