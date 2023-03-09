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
	const response = await fetch(`${process.env.API_URL}/message/list`, {
		method: 'GET',
	});
	const data = await response.json();

	return {
		props: {
			messages: data,
		},
	};
}
