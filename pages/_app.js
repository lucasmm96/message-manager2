import Layout from '@/components/layout/Layout';
import AuthContext from '@/context/AuthContext';

import useAuth from '@/hooks/auth-hook';

import '@/styles/globals.css';

function App({ Component, pageProps }) {
  const { token, isAdmin, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        isAdmin: isAdmin,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
