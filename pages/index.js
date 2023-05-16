import get from '@/utils/httpRequests/get';
import MessageSearch from '@/components/message/MessageSearch';

export default function Home(props) {
	return <MessageSearch messages={props.messages} />;
}

export async function getServerSideProps() {
	const response = await get('/message/list');
	const data = await response.json();

	return {
		props: {
			messages: data,
		},
	};
}
