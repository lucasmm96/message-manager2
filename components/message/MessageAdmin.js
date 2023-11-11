import { useState, useContext, useEffect, Fragment } from 'react';
import get from '@/utils/httpRequests/get';
import AuthContext from '@/context/AuthContext';
import ExpandableBox from '@/components/ui/ExpandableBox';
import styles from '@/components/message/MessageAdmin.module.css';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import MessageFilterButton from '@/components/message/search/MessageFilterButton';

function MessageAdmin() {
  const auth = useContext(AuthContext);

  const tableHeader = ['Expand','Action','Type','Status','Requester','Approve','Reject'];
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState({ pending: { data: [], selected: true }, all: { data: [], selected: false } })
	const [skip, setSkip] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  async function fetchData() {
    const size = 3;
    const response = await get(`/message/pending/list?size=${size}&skip=${skip}`, auth.token);
    const responseData = await response.json();

    setData([...data, ...responseData]);
    setfilteredData({ pending: { data: [...data, ...responseData].filter((message) => message.status === 'Pending'), selected: filteredData.pending.selected }, all: { data: [...data, ...responseData], selected: filteredData.all.selected }});
    setSkip(data.length + size)

    responseData.length > 0 ? setHasMoreData(true) : setHasMoreData(false);
  }

  function mountData() {
    const selectedData = (filteredData.pending.selected) ? filteredData.pending.data : filteredData.all.data;
    if (selectedData.length === 0) return (<tr><td colSpan="7">There is no pending messages</td></tr>)
    return (selectedData.map((message) => (
      <Fragment key={message._id}>
        <tr>
          <td style={{ textAlign: 'center' }}><Icon click={() => { expandedMessageId === message._id ? setExpandedMessageId(null) : setExpandedMessageId(message._id) }} filename={expandedMessageId === message._id ? 'arrow-up.svg' : 'arrow-down.svg'} alt={expandedMessageId === message._id ? 'expand' : 'collapse'} w={18} h={18} /></td>
          <td style={{ width: '20%' }}>{message.action}</td>
          <td style={{ width: '20%' }}>{message.type}</td>
          <td style={{ width: '20%' }}>{message.status}</td>
          <td style={{ width: '20%' }}>{message.requesterName}</td>
          <td style={{ textAlign: 'center', width: '7%' }}><Icon click={message.status === 'Pending' ? approveHandler : null} filename={message.status === 'Pending' ? 'circle-check-solid.svg' : 'disabled-circle-check-solid.svg' } alt='approve' w={20} h={20} /></td>
          <td style={{ textAlign: 'center', width: '7%' }}><Icon click={message.status === 'Pending' ? rejectHandler : null} filename={message.status === 'Pending' ? 'circle-xmark-solid.svg' : 'disabled-circle-xmark-solid.svg' } alt='reject' w={20} h={20} /></td>
        </tr>
        {expandedMessageId === message._id && (
          <tr>
            <td colSpan="7">
              <div className={styles.expandableBox}><ExpandableBox pendingMessage={message} /></div>
            </td>
          </tr>
        )}
      </Fragment>
    )))
  }
  
  const tableRows = mountData()

  function approveHandler() {
    alert('approved!');
  }

  function rejectHandler() {
    alert('rejected!');
  }

  function pendingMessages() {
    setfilteredData({ pending: { data: filteredData.pending.data, selected: true }, all: { data: filteredData.all.data, selected: false }});
  }
  
  function allMessages() {
    setfilteredData({ pending: { data: filteredData.pending.data, selected: false }, all: { data: filteredData.all.data, selected: true }});
  }

  useEffect(() => { if (filteredData.pending.data.length === 0 || filteredData.all.data.length === 0) fetchData() }, []);

  return (
    <div>
      <h1 className={styles.title}>Pending Messages</h1>
      <h3>Records: {filteredData.pending.selected ? filteredData.pending.data.length : filteredData.all.data.length }</h3>
      <div className="container">
        <MessageFilterButton method={pendingMessages} label="Pending" selected={filteredData.pending.selected}/>
        <MessageFilterButton method={allMessages} label="All Messages" selected={filteredData.all.selected}/>
      </div>
        <>
          <table className={`${styles.table} table`}>
            <thead>
              <tr>{tableHeader.map((header, index) => <th key={index}>{header}</th>)}</tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
          {hasMoreData && (<div className={styles.load}><Button click={fetchData} label="Load more" /></div>)}
        </>
    </div>
  );
}

export default MessageAdmin;
