import { useState } from 'react';

function useAuth() {
	const [token, setToken] = useState(false);

	function login(token) {
		setToken(token);
		const tokenExpirationDate = new Date().getTime() + 60 * 60 * 1000;
		localStorage.setItem(
			'token',
			JSON.stringify({
				value: token,
				expirationDate: tokenExpirationDate,
			})
		);
	}

	function logout() {
		localStorage.removeItem('token');
		setToken(null);
	}

	return { token, login, logout };
}

export default useAuth;
