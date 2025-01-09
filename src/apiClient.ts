// apiClient.js
const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";

export async function login(username, password) {
  const response = await fetch(`${BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: username, password }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data;
  } else {
    throw new Error("Login failed");
  }
}

export async function register(login, password, name) {
  const response = await fetch(`${BASE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password, name }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data;
  } else {
    throw new Error("Registration failed");
  }
}

export async function logout() {
  const token = localStorage.getItem("authToken");
  if (!token) return;
  const response = await fetch(`${BASE_API_URL}/auth/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    localStorage.removeItem("authToken");
  } else {
    throw new Error("Logout failed");
  }
}
