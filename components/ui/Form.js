import classes from '@/components/ui/Form.module.css';

function Form(props) {
  return (
    <form className={classes.form}>
      <div className={classes.formGroup}>{props.input}</div>
      {props.actions.map((action, index) => (
        <div key={index} className={classes.formContainer}>
          {action}
        </div>
      ))}
    </form>
  );
}

export default Form;
