import { useState } from 'react';

function useAuth() {
  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function login(args) {
    setToken(args.token);
    setIsAdmin(args.admin);

    const tokenExpirationDate = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem(
      'token',
      JSON.stringify({
        value: args.token,
        expirationDate: tokenExpirationDate,
      })
    );
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setIsAdmin(false);
  }

  return { token, isAdmin, login, logout };
}

export default useAuth;
