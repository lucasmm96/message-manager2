import Head from '@/components/layout/CustomHead';
import MessageSearch from '@/components/message/MessageSearch';

export default function Home(props) {
	return (
		<>
			<Head title="Message Manager" />
			<MessageSearch messages={props.messages} />
		</>
	);
}

export async function getServerSideProps() {
	const API_URL = process.env.API_URL;
	const response = await fetch(`${API_URL}/message/list`, {
		method: 'GET',
	});
	const data = await response.json();

	return {
		props: {
			messages: data,
		},
	};
}
