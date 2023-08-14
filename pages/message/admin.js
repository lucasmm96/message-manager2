import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Head from '@/components/layout/CustomHead';
import MessageAdmin from '@/components/message/MessageAdmin';

function Admin() {
  const router = useRouter();
  const token = useContext(AuthContext).token;
	const isAdmin = useContext(AuthContext).isAdmin;

  useEffect(() => { if (!token || !isAdmin) router.replace('/auth/login') }, [token, isAdmin]);

  return (
    <>
			<Head title="Admin Painel" />
      {token && isAdmin && <MessageAdmin />}
      {!token || !isAdmin && null}
    </>
  );
}

export default Admin;
