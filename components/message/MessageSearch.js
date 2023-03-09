import { useState } from 'react';

import MessageFilter from '@/components/message/search/messageFilter';
import MessageItem from '@/components/message/search/MessageItem';

export default function MessageSearch(props) {
	const [messages, setMessages] = useState(props.messages);

	function applyFilter(data) {
		setMessages(data);
	}

	const messagesLength = messages.length;
	const emptyMessage = messagesLength <= 0;

	return (
		<>
			<h1>Messages</h1>
			<h3>Records: {messagesLength}</h3>
			<MessageFilter data={props.messages} onApplyFilter={applyFilter} />
			{emptyMessage && <h3 className="textCenter">No Matches Found</h3>}
			{!emptyMessage && <MessageItem messages={messages} />}
		</>
	);
}
