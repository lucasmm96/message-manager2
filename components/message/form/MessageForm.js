import Form from '../../ui/Form';
import FormInput from '../../ui/FormInput';
import Button from '../../ui/Button';

import { useState, useEffect } from 'react';

function MessageForm(props) {
	const [formData, setFormData] = useState({ ...props.data });
	const [validForm, setValidForm] = useState(false);

	useEffect(() => {
		props.onChangeHandler(formData);
		props.onBlurHandler(formData);

		const isValid = Object.entries(formData)
			.filter(([key, field]) => field.required)
			.every(([key, field]) => field.valid);

		setValidForm(isValid);
	}, [formData]);

	function onChangeHandler(event) {
		const eventName = event.target.name;
		const eventValue = event.target.value;

		const field = formData[eventName];
		const isValid = field.required ? eventValue !== '' : field.valid;

		setFormData({
			...formData,
			[eventName]: {
				...formData[eventName],
				value: eventValue,
				valid: isValid,
			},
		});
	}

	function onBlurHandler(event) {
		const eventName = event.target.name;

		setFormData({
			...formData,
			[eventName]: {
				...formData[eventName],
				onBlur: true,
			},
		});
	}

	function onSubmitHandler(event) {
		event.preventDefault();

		const data = Object.keys(formData).reduce((acc, key) => {
			return { ...acc, [key]: formData[key].value };
		}, {});

		let bodyData = [
			{
				message: data.message,
				author: data.author,
				postedAt: data.postedAt,
				postUrl: {
					post: data.urlPost,
					story: data.urlStory,
				},
			},
		];

		if (formData.hasOwnProperty('_id')) {
			const _id = formData['_id'].value;
			bodyData[0] = { ...bodyData[0], _id: _id };
		}

		props.onSubmitHandler(bodyData);
	}

	function onCancelHandler(event) {
		event.preventDefault();
		props.onCancelHandler();
	}

	function onDeleteHandler(event) {
		event.preventDefault();
		props.onDeleteHandler([{ _id: formData._id.value }]);
	}

	return (
		<div className="container">
			<Form
				input={
					<>
						<FormInput
							name="message"
							label="Message"
							type="text"
							required={formData.message.required}
							value={formData.message.value}
							valid={formData.message.valid}
							blur={formData.message.onBlur}
							onChangeHandler={onChangeHandler}
							onBlurHandler={onBlurHandler}
						/>
						<FormInput
							name="author"
							label="Author"
							type="text"
							required={formData.author.required}
							value={formData.author.value}
							valid={formData.author.valid}
							blur={formData.author.onBlur}
							onChangeHandler={onChangeHandler}
							onBlurHandler={onBlurHandler}
						/>
						<FormInput
							name="postedAt"
							label="Post Date"
							type="date"
							required={formData.postedAt.required}
							value={formData.postedAt.value}
							valid={formData.postedAt.valid}
							blur={formData.message.onBlur}
							onChangeHandler={onChangeHandler}
							onBlurHandler={onBlurHandler}
						/>
						<FormInput
							name="urlPost"
							label="Post Link"
							type="url"
							required={formData.urlPost.required}
							value={formData.urlPost.value}
							valid={formData.urlPost.valid}
							blur={formData.message.onBlur}
							onChangeHandler={onChangeHandler}
							onBlurHandler={onBlurHandler}
						/>
						<FormInput
							name="urlStory"
							label="Story Link"
							type="url"
							required={formData.urlStory.required}
							value={formData.urlStory.value}
							valid={formData.urlStory.valid}
							blur={formData.message.onBlur}
							onChangeHandler={onChangeHandler}
							onBlurHandler={onBlurHandler}
						/>
					</>
				}
				actions={
					<>
						<Button
							label="Save"
							classes="containerItem"
							click={onSubmitHandler}
							disabled={!validForm}
						/>
						<Button
							label="Cancel"
							classes="containerItem"
							click={onCancelHandler}
						/>
						{props.onDeleteHandler && (
							<Button
								label="Delete"
								classes="containerItem"
								click={onDeleteHandler}
							/>
						)}
					</>
				}
			/>
		</div>
	);
}

export default MessageForm;
