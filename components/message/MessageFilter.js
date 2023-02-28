import classes from './MessageFilter.module.css';

function MessageFilter(props) {
	const messages = props.data;

	function allMessages() {
		props.onApplyFilter(messages);
	}

	function postedMessages() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) <= new Date()
		);
		props.onApplyFilter(filteredData);
	}

	function notPostedMessages() {
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
			<button className={classes.rowItem} onClick={postedMessages}>
				Posted
			</button>
			<button className={classes.rowItem} onClick={notPostedMessages}>
				Not Posted
			</button>
		</div>
	);
}

export default MessageFilter;
