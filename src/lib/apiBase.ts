export const API_BASE_URL = "http://localhost:5173/api";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("auth_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
      console.error("API Error Response:", response.status, errorData);
      throw new ApiError(response.statusText, response.status, errorData);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error", 0, error);
  }
}
