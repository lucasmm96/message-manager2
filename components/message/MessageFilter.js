import classes from './MessageFilter.module.css';

function MessageFilter(props) {
	const messages = props.data;

	function allMessages() {
		props.onApplyFilter(messages);
	}

	function posted() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) <= new Date()
		);
		props.onApplyFilter(filteredData);
	}

	function notPosted() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) >= new Date()
		);
		props.onApplyFilter(filteredData);
	}

	return (
		<div className={classes.row}>
			<button className={classes.rowItem} onClick={allMessages}>
				All
			</button>
			<button className={classes.rowItem} onClick={posted}>
				Posted
			</button>
			<button className={classes.rowItem} onClick={notPosted}>
				Not Posted
			</button>
		</div>
	);
}

export default MessageFilter;
