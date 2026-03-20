const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TOKEN_KEY = "psx_token";

export function saveToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const t = getToken();
  if (t) h["Authorization"] = `Bearer ${t}`;
  return h;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: headers(),
  });
  const data = await res.json().catch(() => ({ detail: "Invalid server response" }));
  if (!res.ok) throw new Error(data.detail || "Request failed");
  return data as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: headers(),
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({ detail: "Invalid server response" }));
  if (!res.ok) throw new Error(data.detail || "Request failed");
  return data as T;
}

export async function apiDelete(path: string): Promise<void> {
  await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: headers(),
    credentials: "include",
  });
}