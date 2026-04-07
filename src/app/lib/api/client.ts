// Shared fetch helper that injects the auth token and handles errors
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';

export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {};
  
  // Set Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let requestBody: any;
  if (body instanceof FormData) {
    // Let fetch set the boundary for FormData
    requestBody = body;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: requestBody,
  });

  if (res.status === 401) {
    // Only redirect if we were actually expecting to be logged in
    if (token) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  }

  if (!res.ok) {
    let errorMessage = `Request failed: ${res.status}`;
    try {
      const errorData = await res.json();
      
      // Handle FastAPI / Pydantic validation errors (422)
      if (res.status === 422 && Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail
          .map((err: any) => {
            const loc = err.loc.join(' > ');
            return `${loc}: ${err.msg}`;
          })
          .join('\n');
      } else {
        errorMessage = errorData.detail || errorData.message || errorMessage;
      }
    } catch {
      // Fallback for non-JSON or malformed responses
      try {
        const text = await res.text();
        if (text) errorMessage = text.substring(0, 200);
      } catch {
        // ignore text parse error
      }
    }
    
    const error: any = new Error(errorMessage);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) return undefined as T;
  
  try {
    return await res.json();
  } catch {
    return undefined as T;
  }
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
