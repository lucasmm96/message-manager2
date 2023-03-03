import { useState } from 'react';

import classes from './Form.module.css';

function Form(props) {
	const [formState, setFormState] = useState({ ...props.data });

	function changeHandler(event) {
		setFormState({ ...formState, [event.target.name]: event.target.value });
	}

	function submitHandler(event) {
		event.preventDefault();
		props.onSubmitHandler(formState);
	}

	function cancelHandler() {
		props.onCancelHandler();
	}

	return (
		<form className={classes.form}>
			{props.fields.map((field) => (
				<div key={field.name} className={classes.formGroup}>
					<label htmlFor={field.name}>{field.label}</label>
					<input
						type={field.type}
						id={field.name}
						name={field.name}
						{...(field.required && { required: true })}
						value={formState[field.name] || ''}
						onChange={changeHandler}
					/>
				</div>
			))}
			<div className={classes.formContainer}>
				<button
					className={classes.formContainerItem}
					type="submit"
					onClick={submitHandler}
				>
					Submit
				</button>
				<button
					className={classes.formContainerItem}
					type="button"
					id="cancel"
					onClick={cancelHandler}
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default Form;
