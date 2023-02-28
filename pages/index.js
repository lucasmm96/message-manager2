import { useState } from 'react';

import Head from '@/components/layout/CustomHead';
import MessageFilter from '@/components/message/messageFilter';
import MessageItem from '@/components/message/MessageItem';

export default function Home(props) {
	const [messages, setMessages] = useState(props.messages.filteredData);

	function applyFilter(data) {
		setMessages(data);
	}

	return (
		<>
			<Head title="Message Manager" />
			<h1>Messages</h1>
			<MessageFilter data={props.messages} onApplyFilter={applyFilter} />
			<MessageItem messages={messages} />
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetch('http://localhost:3000/message/list');
	const data = await response.json();

	return {
		props: {
			messages: {
				fullData: data,
				filteredData: data,
			},
		},
	};
}
