function save(token) {
	localStorage.setItem('token', token);
}

function get() {
	const token = localStorage.getItem('token');
	return token;
}

export default {
	save,
	get,
};
