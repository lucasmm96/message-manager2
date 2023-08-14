import { useEffect, useState, useContext } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';

function MessageAdmin() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await get('/message/pending/list', auth.token);
      const responseData = await response.json();
      setData(responseData);
      setStatus(response);
    }
    fetchData();
  }, []);

  return (
		data ? status?.ok ? <p>{JSON.stringify(data)}</p> : <p>Something went wrong</p> : <p>Nothing to show...</p>
  );
}

export default MessageAdmin;
