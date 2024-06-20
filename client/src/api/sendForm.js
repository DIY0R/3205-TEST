export const sendForm = async (form) => {
  const requestId = localStorage.getItem('requestId');
  const response = await fetch(
    `http://localhost:8080/api/auth/login?requestId=${requestId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();

  return data;
};
