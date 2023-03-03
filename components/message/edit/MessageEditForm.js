import { useRouter } from 'next/router';

import Form from '@/components/ui/Form';

function MessageEditForm(props) {
	const router = useRouter();

	const fields = [
		{
			name: 'message',
			label: 'Message',
			type: 'text',
			required: true,
			data: props.data.message,
		},
		{
			name: 'author',
			label: 'Author',
			type: 'text',
			required: true,
			data: props.data.author,
		},
		{
			name: 'postedAt',
			label: 'Post Date',
			type: 'date',
			required: false,
			data: props.data.postedAt,
		},
		{
			name: 'urlPost',
			label: 'Post Link',
			type: 'url',
			required: false,
			data: props.data.urlPost,
		},
		{
			name: 'urlStory',
			label: 'Story Link',
			type: 'url',
			required: false,
			data: props.data.urlStory,
		},
	];

	const structuredData = {
		_id: props.data._id,
		message: props.data.message,
		author: props.data.author,
		postedAt: props.data.postedAt,
		urlPost: props.data.urlPost,
		urlStory: props.data.urlStory,
	};

	async function submitHandler(data) {
		const bodyData = [
			{
				_id: data._id,
				message: data.message,
				author: data.author,
				postedAt: data.postedAt,
				postUrl: {
					post: data.urlPost,
					story: data.urlStory,
				},
			},
		];

		try {
			await fetch('http://localhost:3000/message/update', {
				method: 'POST',
				body: bodyData,
			});
		} catch (error) {}
	}

	function cancelHandler() {
		router.push('/');
	}

	return (
		<div className="container">
			<Form
				fields={fields}
				data={structuredData}
				onSubmitHandler={submitHandler}
				onCancelHandler={cancelHandler}
			/>
		</div>
	);
}

export default MessageEditForm;
