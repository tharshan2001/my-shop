export const AuthService = {
  async login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  async register(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  }
};