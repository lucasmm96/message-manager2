import { useState, useEffect } from 'react';

import MessageFilterButton from '@/components/message/search/MessageFilterButton';
import MessageFilterInput from '@/components/message/search/MessageFilterInput';

function MessageFilter(props) {
  const [data, setData] = useState(props.data);
  const [filteredData, setFilteredData] = useState([ ...props.data.full.messages ]);
  const [searchText, setSearchText] = useState('');

  function allMessages() {
    setData(defineFilter('full'));
    setFilteredData(data.full.messages);
    props.onApplyFilter(defineFilter('full'), data.full.messages);
  }

  function postedMessages() {
    setData(defineFilter('posted'));
    setFilteredData(data.posted.messages);
    props.onApplyFilter(defineFilter('posted'), data.posted.messages);
  }

  function notPostedMessages() {
    setData(defineFilter('not_posted'));
    setFilteredData(data.not_posted.messages);
    props.onApplyFilter(defineFilter('not_posted'), data.not_posted.messages);
  }

  function pendingMessages() {
    setData(defineFilter('pending'));
    setFilteredData(data.pending.messages);
    props.onApplyFilter(defineFilter('pending'), data.pending.messages);
  }

  function customSearch(event) {
    setSearchText(event.target.value);
    const currentData = getSelectedMessages({ ...data });

    const customFilter = { ...data };
    customFilter.custom.selected = true;
    setData(customFilter);

    if (event.target.value.length > 0) {
      const newData = currentData.filter((message) => {
        return (
          message.message.toLowerCase().includes(searchText.toLowerCase()) ||
          message.author.toLowerCase().includes(searchText.toLowerCase()) ||
          message.postedAt.includes(searchText)
        );
      });
      setFilteredData(newData);
    } else {
      setFilteredData(currentData);
    }
    props.onApplyFilter(data, filteredData);
  }

  function getSelectedMessages(data) {
    for (const key in data) if (data[key].selected) return data[key].messages;
    return [];
  }

  function defineFilter(field) {
    const filter = { ...data };
    for (const item in filter) filter[item].selected = false;
    filter[field].selected = true;
    return filter;
  }

  useEffect(() => {
    props.onApplyFilter(data, filteredData);
  }, [data, filteredData, props]);

  return (
    <div className="container">
      <MessageFilterButton
        method={allMessages}
        label="All"
        selected={data.full.selected}
      />
      <MessageFilterButton
        method={postedMessages}
        label="Posted"
        selected={data.posted.selected}
      />
      <MessageFilterButton
        method={notPostedMessages}
        label="Not Posted"
        selected={data.not_posted.selected}
      />
      <MessageFilterButton
        method={pendingMessages}
        label="Pending"
        selected={data.pending.selected}
      />
      <MessageFilterInput
        method={customSearch}
        label="Custom Search"
        selected={data.custom.selected}
        value={searchText}
        onChangeHandler={customSearch}
      />
    </div>
  );
}

export default MessageFilter;
