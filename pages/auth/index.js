import { useState } from 'react';

import Head from '@/components/layout/CustomHead';
import Login from '@/components/auth/login';
import Signup from '@/components/auth/signup';

function Auth() {
	const [headText, setHeadText] = useState('Login');
	const [isLoginActive, setIsLoginActive] = useState(true);
	const [isSignupActive, setIsSignupActive] = useState(false);

	function selectLogin() {
		setHeadText('Login');
		setIsLoginActive(true);
		setIsSignupActive(false);
	}

	function selectSignup() {
		setHeadText('Signup');
		setIsLoginActive(false);
		setIsSignupActive(true);
	}

	return (
		<>
			<Head title={headText} />
			<h1>{headText}</h1>
			<div className="container">
				{isLoginActive && <Login onSelectSignupHandler={selectSignup} />}
				{isSignupActive && <Signup onSelectLoginHandler={selectLogin} />}
			</div>
		</>
	);
}

export default Auth;
