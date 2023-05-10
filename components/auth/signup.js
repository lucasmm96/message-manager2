import { useState } from 'react';

import Form from '@/components/ui/Form';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

function Login(props) {
	const [username, setUsername] = useState({
		value: '',
		required: true,
		valid: false,
		onBlur: false,
	});
	const [email, setEmail] = useState({
		value: '',
		required: true,
		valid: false,
		onBlur: false,
	});
	const [password, setPassword] = useState({
		value: '',
		required: true,
		valid: false,
		onBlur: false,
	});
	const [admin, setAdmin] = useState({
		value: false,
		required: true,
		valid: true,
		onBlur: true,
	});

	function usernameBlurHandler() {
		setUsername({ ...username, onBlur: true });
	}

	function emailBlurHandler() {
		setEmail({ ...email, onBlur: true });
	}

	function passwordBlurHandler() {
		setPassword({ ...password, onBlur: true });
	}

	function usernameChangeHandler(event) {
		const usernameValue = event.target.value;

		setUsername({
			...email,
			value: usernameValue,
			valid: username.required ? usernameValue !== '' : username.valid,
		});
	}

	function emailChangeHandler(event) {
		const emailValue = event.target.value;

		setEmail({
			...email,
			value: emailValue,
			valid: email.required ? emailValue !== '' : email.valid,
		});
	}

	function passwordChangeHandler(event) {
		const passwordValue = event.target.value;

		setPassword({
			...password,
			value: passwordValue,
			valid: password.required ? passwordValue !== '' : password.valid,
		});
	}

	function adminChangeHandler(active) {
		setAdmin({
			...admin,
			value: active,
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			const response = await post('/auth/signup', {
				username: username.value,
				email: email.value,
				password: password.value,
			});
			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			console.log(responseJSON);
			console.log(responseStatusCode);

			// setResponseData(<MessageAddResponse response={responseJSON} />);

			// const { resStatus, resData } = statusCodeHandler(responseStatusCode);

			// setResponseStatus(resStatus);

			// if (resData !== '') {
			// 	setResponseData(resData);
			// }
		} catch (error) {
			// setResponseData(`Something went wrong. Error: (${error}).`);
			console.log(`Something went wrong. Error: (${error}).`);
		}

		router.push('/');
	}

	function onSelectLoginHandler() {
		props.onSelectLoginHandler();
	}

	return (
		<Form
			input={
				<>
					<FormInput
						name="username"
						label="Username"
						type="text"
						required={username.required}
						value={username.value}
						valid={username.valid}
						blur={username.onBlur}
						onChangeHandler={usernameChangeHandler}
						onBlurHandler={usernameBlurHandler}
					/>
					<FormInput
						name="email"
						label="Email"
						type="email"
						required={email.required}
						value={email.value}
						valid={email.valid}
						blur={email.onBlur}
						onChangeHandler={emailChangeHandler}
						onBlurHandler={emailBlurHandler}
					/>
					<FormInput
						name="password"
						label="Password"
						type="password"
						required={password.required}
						value={password.value}
						valid={password.valid}
						blur={password.onBlur}
						onChangeHandler={passwordChangeHandler}
						onBlurHandler={passwordBlurHandler}
					/>
					<FormInput
						name="admin"
						label="Admin"
						type="switcher"
						onSwitcherHandler={adminChangeHandler}
					/>
				</>
			}
			actions={
				<>
					<Button
						label="Signup"
						classes="containerItem"
						click={submitHandler}
						disabled={!username.valid || !email.valid || !password.valid}
					/>
					<Button
						label="Login"
						classes="containerItem"
						click={onSelectLoginHandler}
					/>
				</>
			}
		/>
	);
}

export default Login;
