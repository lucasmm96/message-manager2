async function post(url, data) {
	const response = await fetch(`${process.env.API_URL}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
  return response;
}

export default post;
