import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/context/AuthContext';
import get from '@/utils/httpRequests/get';
import MessageSearch from '@/components/message/MessageSearch';

function ListMessage(props) {
  const router = useRouter();
  const token = useContext(AuthContext).token;

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token]);

  return (
    <>
      {token && <MessageSearch messages={props.messages} />}
      {!token && null}
    </>
  );
}

export async function getServerSideProps() {
  const response = await get('/message/list');
  const data = await response.json();

  return {
    props: {
      messages: data,
    },
  };
}

export default ListMessage;
