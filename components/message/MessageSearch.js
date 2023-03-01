import { useState } from 'react';

import MessageFilter from '@/components/message/search/messageFilter';
import MessageItem from '@/components/message/search/MessageItem';

export default function MessageSearch(props) {
	const [messages, setMessages] = useState(props.messages);

	function applyFilter(data) {
		setMessages(data);
	}

	return (
		<>
			<h1>Messages</h1>
			<h3>Records: {messages.length}</h3>
			<MessageFilter data={props.messages} onApplyFilter={applyFilter} />
			<MessageItem messages={messages} />
		</>
	);
}
