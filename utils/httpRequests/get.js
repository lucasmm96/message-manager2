async function get(url, token = null) {
  const postHeaders = { 'Content-Type': 'application/json' };
  if (token) postHeaders.Authorization = 'Bearer ' + token;
  const response = await fetch(`${process.env.API_URL || "http://localhost:3000"}${url}`, {
    method: "GET",
    headers: postHeaders,
  });
  return response;
}

export default get;
