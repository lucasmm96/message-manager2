import Link from 'next/link';

import Head from '@/components/layout/CustomHead';
import Card from '@/components/ui/Card';

export default function Home(props) {
	return (
		<>
			<Head title="Message Manager" />
			<h1>Messages</h1>
			{props.messages.map((message) => (
				<Card key={message.id}>
					<h2> {message.postedAt}</h2>
					<p>{message.message}</p>
					<cite>{message.author}</cite>
					<p>
						<Link href={message.postUrl.post}>Post</Link>
					</p>
					<p>
						<Link href={message.postUrl.story}>Story</Link>
					</p>
				</Card>
			))}
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
