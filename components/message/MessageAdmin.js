import { useState, useContext, useEffect, Fragment } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';
import ExpandableBox from '@/components/ui/ExpandableBox';
import styles from '@/components/message/search/MessageAdmin.module.css';
import Button from '@/components/ui/Button';

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

  useEffect(() => { fetchData() }, []);

  return (
    <div>
    <h1 className={styles.title}>Pending Messages</h1>
      <p>Counter: {data.length}</p>
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
                <td><Button click={() => { expandedMessageId === message._id ? setExpandedMessageId(null) : setExpandedMessageId(message._id) }} label="Open" disabled={false}/></td>
                <td>{message.action}</td>
                <td>{message.type}</td>
                <td>{message.status}</td>
                <td>{message.requesterName}</td>
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
          <Button click={fetchData} label="Click to load more..." disabled={false}/>
        </div>
      )
      }
    </div>
  );
}

export default MessageAdmin;
