async function post(url, data, token) {
  const postHeaders = { 'Content-Type': 'application/json' };

  if (token !== '') {
    postHeaders.Authorization = 'Bearer ' + token;
  }

  const response = await fetch(`${process.env.API_URL}${url}`, {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify(data),
  });
  return response;
}

export default post;
