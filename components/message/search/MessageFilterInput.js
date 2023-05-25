import classes from '@/components/message/search/MessageFilterInput.module.css';

import MessageFilterButton from '@/components/message/search/MessageFilterButton';

function MessageFilterInput(props) {
  const isSelected = props.selected;
  const inputClasses = `${classes.input} containerItem`;

  return (
    <>
      {!isSelected && (
        <MessageFilterButton
          method={props.method}
          label={props.label}
          selected={props.selected}
        />
      )}
      {isSelected && (
        <input
          className={inputClasses}
          placeholder={props.label}
          value={props.value}
          onChange={props.onChangeHandler}
          autoFocus
        />
      )}
    </>
  );
}

export default MessageFilterInput;
