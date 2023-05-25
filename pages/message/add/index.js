import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/context/AuthContext';
import MessageAdd from '@/components/message/MessageAdd';

function AddMessage() {
  const router = useRouter();
  const token = useContext(AuthContext).token;

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token]);

  return (
    <>
      {token && <MessageAdd />}
      {!token && null}
    </>
  );
}

export default AddMessage;
