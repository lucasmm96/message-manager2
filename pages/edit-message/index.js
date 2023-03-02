import { useRouter } from 'next/router';

function EditMessage() {
	const router = useRouter();
	const message = {
		_id: router.query._id,
		message: router.query.message,
		author: router.query.author,
		addedAt: router.query.addedAt,
		postedAt: router.query.postedAt,
		postUrl: {
			post: router.query.postUrlPost,
			story: router.query.postUrlStory,
		},
	};

	return (
		<>
			<h1>EditMessage</h1>
			<p><b>_id:</b> {message._id}</p>
			<p><b>message:</b> {message.message}</p>
			<p><b>author:</b> {message.author}</p>
			<p><b>addedAt:</b> {message.addedAt}</p>
			<p><b>postedAt:</b> {message.postedAt}</p>
			<p><b>postUrl(post):</b> {message.postUrl.post}</p>
			<p><b>postUrl(story):</b> {message.postUrl.story}</p>
		</>
	);
}

export default EditMessage;
