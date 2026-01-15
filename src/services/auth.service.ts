export const AUTH_BASE = "/api/auth";

export const AuthService = {
  // Login user
  async login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch(`${AUTH_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  // Register user
  async register(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch(`${AUTH_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },
};