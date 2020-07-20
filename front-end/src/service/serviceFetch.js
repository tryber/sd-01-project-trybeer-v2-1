exports.fetchApi = async ({ endpoint, method, body, headers = { 'Content-Type': 'application/json' } }) => {
  if (method === "GET") {
    const response = await fetch(
      endpoint,
      {
        method,
        headers,
      })
    const data = await response.json();
    return data;
  }
  const response = await fetch(
    endpoint,
    {
      method,
      headers,
      body: JSON.stringify({ ...body }),
    })
  const data = await response.json();
  return data;
}

exports.requestWithToken = (user, endpoint, method = 'GET', body) => {
  if (!body) return {
    endpoint: `http://localhost:3001/${endpoint}`,
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: user.token,
    }
  }
  return {
    endpoint: `http://localhost:3001/${endpoint}`,
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: user.token,
    },
    body,
  }
}
