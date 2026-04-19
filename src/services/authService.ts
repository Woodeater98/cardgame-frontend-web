const API_URL = "http://localhost:3000"; // adjust if needed

export async function register(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Register failed");

  return res.json(); // { access_token }
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json(); // { access_token }
}
