import classes from '@/components/message/search/MessageItemBody.module.css';

function MessageItemBody(props) {
	return (
		<>
			<div className={classes.itemMessage}>
				<p>{props.message}</p>
			</div>
			<div className={classes.itemAuthor}>
				<p>{props.author}</p>
			</div>
		</>
	);
}

export default MessageItemBody;
