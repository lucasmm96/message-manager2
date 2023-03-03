import MessageEditForm from '@/components/message/edit/MessageEditForm';

function MessageEdit(props) {
	return (
		<>
			<h1>Edit Message</h1>
			<MessageEditForm data={props.data} />
		</>
	);
}

export default MessageEdit;
