async function get(url) {
  const response = await fetch(`${process.env.API_URL}${url}`);
  return response;
}

export default get;
