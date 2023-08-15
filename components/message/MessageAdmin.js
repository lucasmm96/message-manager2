import { useEffect, useState, useContext } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';
import Card from '@/components/ui/Card';

function MessageAdmin() {
  const auth = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // Número da página
  const [hasMoreData, setHasMoreData] = useState(true); // Indicador de mais dados para carregar
  const pageSize = 2; // Tamanho da página

  const fetchData = async () => {
    const response = await get(`/message/pending/list?page=${pageNumber}&size=${pageSize}`, auth.token);
    const responseData = await response.json();

    if (responseData.length === 0) {
      setHasMoreData(false); // Não há mais dados para carregar
    } else {
      setData((prevData) => [...prevData, ...responseData]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom && hasMoreData) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, hasMoreData]);

  return (
    <div>
      <h1>Pending Messages</h1>
      <div className="container">
        {data.map((message) => (
          <Card
            key={message._id}
            header={message.requestedAt}
            body={
              <div>
                <p>{message.action}</p>
                <p>{message.type}</p>
                <p>{message.status}</p>
              </div>
            }
            footer={<div>Options...</div>}
          />
        ))}
      </div>
      {hasMoreData && <p>Scroll to load more...</p>}
    </div>
  );
}

export default MessageAdmin;
