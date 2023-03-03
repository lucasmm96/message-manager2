import Form from '@/components/ui/Form';

function MessageEditForm(props) {
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
			name: 'post',
			label: 'Post Link',
			type: 'url',
			required: false,
			data: props.data.urlPost,
		},
		{
			name: 'story',
			label: 'Story Link',
			type: 'url',
			required: false,
			data: props.data.urlStory,
		},
	];

	return (
		<div className="container">
			<Form fields={fields} />
		</div>
	);
}

export default MessageEditForm;
