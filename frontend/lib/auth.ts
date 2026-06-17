export const auth = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};