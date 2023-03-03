import classes from './Form.module.css';

function Form(props) {
	return (
		<form className={classes.form}>
			{props.fields.map((field) => (
				<div className={classes.formGroup}>
					<label htmlFor={field.name}>{field.label}</label>
					<input
						type={field.type}
						id={field.name}
						name={field.name}
						{...(field.required && { required: true })}
						value={field.data}
					/>
				</div>
			))}
			<div className={classes.formContainer}>
				<button className={classes.formContainerItem} type="submit">
					Submit
				</button>
				<button className={classes.formContainerItem} type="button" id="cancel">
					Cancel
				</button>
			</div>
		</form>
	);
}

export default Form;
