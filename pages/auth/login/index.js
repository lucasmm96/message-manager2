import { useRouter } from 'next/router';

import Head from '@/components/layout/CustomHead';
import Login from '@/components/auth/login';

function AuthLogin() {
	const router = useRouter();

	function selectSignup() {
		router.replace('/auth/signup');
	}

	return (
		<>
			<Head title="Login" />
			<h1>Login</h1>
			<div className="container">
				<Login onSelectSignupHandler={selectSignup} />
			</div>
		</>
	);
}

export default AuthLogin;
