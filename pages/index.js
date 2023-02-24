import Head from '@/components/layout/CustomHead';

import MessageItem from '@/components/message/MessageItem';

export default function Home(props) {
	return (
		<>
			<Head title="Message Manager" />
			<h1>Messages</h1>
			<MessageItem messages={props.messages} />
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetch('http://localhost:3000/message/list');
	const data = await response.json();

	return {
		props: {
			messages: data,
		},
	};
}
