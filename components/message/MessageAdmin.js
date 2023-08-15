import { useEffect, useState, useContext, Fragment } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';
import ExpandableBox from '@/components/ui/ExpandableBox';
import styles from '@/components/message/search/MessageAdmin.module.css';
import Button from '@/components/ui/Button';

function MessageAdmin() {
  const auth = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const pageSize = 2;

  const fetchData = async () => {
    const response = await get(`/message/pending/list?page=${pageNumber}&size=${pageSize}`, auth.token);
    const responseData = await response.json();

    if (responseData.length === 0) {
      setHasMoreData(false);
    } else {
      setData((prevData) => [...prevData, ...responseData]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom && hasMoreData) {
      fetchData();
    }
  };

  const handleExpand = (messageId) => {
    setExpandedMessageId(messageId === expandedMessageId ? null : messageId); // Inverte o estado da expansão
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

  function approveHandler() {
    alert('approved!');
  }

  function rejectHandler() {
    alert('rejected!');
  }

  return (
    <div>
      <h1 className={styles.title}>Pending Messages</h1>
      <table className={`${styles.table} table`}>
        <thead>
          <tr>
            <th>Open</th>
            <th>Action</th>
            <th>Type</th>
            <th>Status</th>
            <th>Requester</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((message) => (
            <Fragment key={message._id}>
              <tr>
                <td>
                  <button onClick={() => handleExpand(message._id)}>Open</button>
                </td>
                <td>{message.action}</td>
                <td>{message.type}</td>
                <td>{message.status}</td>
                <td>{message.requester}</td>
                <td className={styles.itemContainer}>
                  <Button
                    click={approveHandler}
                    label="Approve"
                    disabled={false}
                  />
                  <Button
                    click={rejectHandler}
                    label="Reject"
                    disabled={false}
                  />
                </td>
              </tr>
              {expandedMessageId === message._id && (
                <tr>
                  <td colSpan="6">
                    <div className={styles.expandableBox}>
                      <ExpandableBox action={message.action} />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {hasMoreData && (
        <p className={styles.scrollInfo}>Scroll to load more...</p>
      )}
    </div>
  );
}

export default MessageAdmin;
