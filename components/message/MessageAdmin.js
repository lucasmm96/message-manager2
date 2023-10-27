import { useState, useContext, useEffect, Fragment } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';
import ExpandableBox from '@/components/ui/ExpandableBox';
import styles from '@/components/message/MessageAdmin.module.css';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

function MessageAdmin() {
  const auth = useContext(AuthContext);

  const [data, setData] = useState([]);
	const [skip, setSkip] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  
  async function fetchData() {
    const size = 3;
    const response = await get(`/message/pending/list?size=${size}&skip=${skip}`, auth.token);
    const responseData = await response.json();

    if (responseData.length > 0) {
      setData([...data, ...responseData]);
      setSkip(data.length + size)
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
  }

  function approveHandler() {
    alert('approved!');
  }

  function rejectHandler() {
    alert('rejected!');
  }

  useEffect(() => { if (data.length === 0) { fetchData()  } }, []);

  return (
    <div>
    <h1 className={styles.title}>Pending Messages</h1>
      <h3>Records: {data.length}</h3>
      <table className={`${styles.table} table`}>
        <thead>
          <tr>
            <th></th>
            <th>Action</th>
            <th>Type</th>
            <th>Status</th>
            <th>Requester</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((message) => (
            <Fragment key={message._id}>
              <tr>
                <td style={{ textAlign: 'center' }}><Icon click={() => { expandedMessageId === message._id ? setExpandedMessageId(null) : setExpandedMessageId(message._id) }} filename={expandedMessageId === message._id ? 'arrow-up.svg' : 'arrow-down.svg'} alt={expandedMessageId === message._id ? 'expand' : 'collapse'} w={18} h={18} /></td>
                <td>{message.action}</td>
                <td>{message.type}</td>
                <td>{message.status}</td>
                <td>{message.requesterName}</td>
                <td style={{ textAlign: 'center' }}><Icon click={message.status === 'Pending' ? approveHandler : null} filename={message.status === 'Pending' ? 'circle-check-solid.svg' : 'disabled-circle-check-solid.svg' } alt='approve' w={20} h={20} /></td>
                <td style={{ textAlign: 'center' }}><Icon click={message.status === 'Pending' ? rejectHandler : null} filename={message.status === 'Pending' ? 'circle-xmark-solid.svg' : 'disabled-circle-xmark-solid.svg' } alt='reject' w={20} h={20} /></td>
              </tr>
              {expandedMessageId === message._id && (
                <tr>
                  <td colSpan="7">
                    <div className={styles.expandableBox}>
                      <ExpandableBox pendingMessage={message} />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {hasMoreData && ( 
        <div className={styles.load}>
          <Button click={fetchData} label="Load more" />
        </div>
      )
      }
    </div>
  );
}

export default MessageAdmin;
