import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import MessageAdmin from '@/components/message/MessageAdmin';

function Admin() {
  const router = useRouter();
  const token = useContext(AuthContext).token;

  useEffect(() => { if (!token) router.replace('/auth/login') }, [token]);

  return (
    <>
      {token && <MessageAdmin />}
      {!token && null}
    </>
  );
}

export default Admin;
