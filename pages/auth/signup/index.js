import { useRouter } from 'next/router';

import Head from '@/components/layout/CustomHead';
import Signup from '@/components/auth/signup';

function AuthSignup() {
	const router = useRouter();

	function selectLogin() {
		router.replace('/auth/login');
	}

	return (
		<>
			<Head title="Signup" />
			<h1>Signup</h1>
			<div className="container">
				<Signup onSelectLoginHandler={selectLogin} />
			</div>
		</>
	);
}

export default AuthSignup;
