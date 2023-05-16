import classes from '@/components/ui/Form.module.css';

function Form(props) {
	return (
		<form className={classes.form}>
			<div className={classes.formGroup}>{props.input}</div>
			<div className={classes.formContainer}>{props.actions}</div>
		</form>
	);
}

export default Form;
