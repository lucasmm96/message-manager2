import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/context/AuthContext';
import get from '@/utils/httpRequests/get';
import MessageSearch from '@/components/message/MessageSearch';

function ListMessage(props) {
  const router = useRouter();
  const token = useContext(AuthContext).token;

  useEffect(() => { if (!token) router.replace('/auth/login') }, [token]);
  return (
    <>
      {token && <MessageSearch data={props} />}
      {!token && null}
    </>
  );
}

export async function getServerSideProps() {
  const size = 20;
  const skip = 0;
  const response = await get(`/message/list?size=${size}&skip=${skip}`);
  const responseData = await response.json();

  return {
    props: {
      message: [ ...responseData ],
      size: size,
      skip: responseData.length
    },
  };
}

export default ListMessage;
