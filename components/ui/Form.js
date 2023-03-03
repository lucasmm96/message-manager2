import { useState } from 'react';
import { useRouter } from 'next/router';

import classes from './Form.module.css';

function Form(props) {
	const router = useRouter();

	const [formState, setFormState] = useState({
		_id: props.data._id,
		message: props.data.message,
		author: props.data.author,
		postedAt: props.data.postedAt,
		urlPost: props.data.urlPost,
		urlStory: props.data.urlStory,
	});

	function changeHandler(event) {
		setFormState({ ...formState, [event.target.name]: event.target.value });
	}

	function submitHandler(event) {
		event.preventDefault();
		console.log(formState);
	}

	function cancelHandler() {
		router.push('/');
	}

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
