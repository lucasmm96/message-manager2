import { useState } from 'react';
import { useRouter } from 'next/router';

import Form from '@/components/ui/Form';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

import post from '@/utils/httpRequests/post';

function Login(props) {
	const router = useRouter();

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

	function emailBlurHandler() {
		setEmail({ ...email, onBlur: true });
	}

	function passwordBlurHandler() {
		setPassword({ ...password, onBlur: true });
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

	async function submitHandler(event) {
		event.preventDefault();
		try {
			const response = await post('/auth/login', {
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

	function onSelectSignupHandler(event) {
		event.preventDefault();
		props.onSelectSignupHandler();
	}

	return (
		<Form
			input={
				<>
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
				</>
			}
			actions={
				<>
					<Button
						label="Login"
						classes="containerItem"
						click={submitHandler}
						disabled={!email.valid || !password.valid}
					/>
					<Button
						label="Signup"
						classes="containerItem"
						click={onSelectSignupHandler}
					/>
				</>
			}
		/>
	);
}

export default Login;
