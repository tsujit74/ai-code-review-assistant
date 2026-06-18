export const auth = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
  },

  getUser() {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any) {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  remove() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};