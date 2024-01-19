import classes from '@/components/ui/input/TextInput.module.css';

function TextInput(props) {
  function onChangeHandler(event) {
    props.onChangeHandler(event);
  }

  function onBlurHandler(event) {
    props.onBlurHandler(event);
  }

  return (
    <>
      <input
        id={props.name}
        className={classes.input}
        type={props.type}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </>
  );
}

export default TextInput;
