import { useState } from 'react';
import Link from 'next/link';

import classes from './Form.module.css';
import Icon from '@/components/ui/Icon';

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
					{field.type === 'url' && formState[field.name] ? (
						<div>
							<label htmlFor={field.name}>{field.label}</label>
							<Link href={formState[field.name]} target="_blank">
								<Icon filename="link.svg" alt="link" w={20} h={20} />
							</Link>
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
					{/* {field.type === 'url' && <Icon filename='link.svg' alt='link' w={30} h={30} />} */}
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
