import { useState, useEffect } from 'react';

import Head from '@/components/layout/CustomHead';
import styles from '@/components/message/MessageSearch.module.css';
import MessageFilter from '@/components/message/search/MessageFilter';
import MessageItem from '@/components/message/search/MessageItem';
import Button from '@/components/ui/Button';
import get from '@/utils/httpRequests/get';

function MessageSearch(props) {
  const [data, setData] = useState({ 
    full: { messages: [ ...props.data.message ], selected: true }, 
    posted: { messages: props.data.message.filter((message) => new Date(message.postedAt) <= new Date()), selected: false }, 
    not_posted: { messages: props.data.message.filter((message) => new Date(message.postedAt) >= new Date()), selected: false }, 
    pending: { messages: props.data.message.filter((message) => message.postUrl.post === '' || message.postUrl.story === ''), selected: false },
    custom: { messages: [], selected: false }
  });
  const [filteredData, setFilteredData] = useState([ ...props.data.message ]);
  const [skip, setSkip] = useState(props.data.skip);
  const [hasMoreData, setHasMoreData] = useState(true);
  
  async function fetchData() {
    const size = props.data.size;
    const response = await get(`/message/list?size=${size}&skip=${skip}`);
    const responseData = await response.json();

    if (responseData.length > 0) {
      const newMessages = [ ...data.full.messages, ...responseData ];
      const newData = { ...data };
      const { key: selected } = (newData => { for (const key in newData) if (newData[key].selected && key !== 'custom') return { key }})(newData);
  
      newData.full.messages = newMessages;
      newData.posted.messages = newMessages.filter((message) => new Date(message.postedAt) <= new Date());
      newData.not_posted.messages = newMessages.filter((message) => new Date(message.postedAt) >= new Date());
      newData.pending.messages = newMessages.filter((message) => message.postUrl.post === '' || message.postUrl.story === '');
      
      applyFilter(newData,newData[selected].messages);
      setSkip(newMessages.length);
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
  }

  function applyFilter(data, filteredData) {
    setData(data);
    setFilteredData(filteredData);
  }

  useEffect(() => {
    applyFilter(data, filteredData);
  }, [data, filteredData]);

  return (
    <>
      <Head title="Message List" />
      <h1>Messages</h1>
      <h3>Records: {filteredData.length}</h3>
      <MessageFilter data={data} onApplyFilter={applyFilter} />
      {filteredData.length === 0 && <h3 className="textCenter">No Matches Found</h3>}
      {filteredData.length > 0 && <MessageItem messages={filteredData} />}
      {hasMoreData && (<div className={styles.load}><Button click={fetchData} label="Load more" /></div>)}
    </>
  );
}

export default MessageSearch;