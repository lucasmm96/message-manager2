import { useState } from 'react';

import classes from './Form.module.css';
import IconLink from './IconLink';

function Form(props) {
	const [formState, setFormState] = useState({ ...props.data });

	function changeHandler(event) {
		setFormState({ ...formState, [event.target.name]: event.target.value });
	}

	function submitHandler(event) {
		event.preventDefault();
		props.onSubmitHandler(formState);
	}

	function cancelHandler(event) {
		event.preventDefault();
		props.onCancelHandler();
	}

	function deleteHandler(event) {
		event.preventDefault();
		props.onDeleteHandler(formState);
	}

	return (
		<form className={classes.form}>
			{props.fields.map((field) => (
				<div key={field.name} className={classes.formGroup}>
					{field.type === 'url' && formState[field.name] ? (
						<div>
							<label htmlFor={field.name}>{field.label}</label>
							<IconLink
								href={formState[field.name]}
								newTab={true}
								filename="link.svg"
								alt="Open Link"
								w={20}
								h={20}
							/>
						</div>
					) : (
						<label htmlFor={field.name}>{field.label}</label>
					)}
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
					Save
				</button>
				<button
					className={classes.formContainerItem}
					type="button"
					id="cancel"
					onClick={cancelHandler}
				>
					Cancel
				</button>
				<button
					className={classes.formContainerItem}
					type="button"
					id="delete"
					onClick={deleteHandler}
				>
					Delete
				</button>
			</div>
		</form>
	);
}

export default Form;
