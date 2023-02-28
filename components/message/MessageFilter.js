import classes from './MessageFilter.module.css';

function MessageFilter(props) {
	const messages = props.data.fullData;

	function allMessages() {
		props.onApplyFilter(messages);
	}

	function onlyStory() {
		props.onApplyFilter(
			messages.filter((message) => message.postUrl.story === '')
		);
	}

	// function posted() {

	// 	console.log(messages.filter((message) => message.postedAt));
		
	// 	props.onApplyFilter(messages);

	// }

	// function notPosted() {

	// }

	return (
		<div className={`${classes.row} ${classes.padingX}`}>
			<button className={classes.rowItem} onClick={allMessages}>
				All
			</button>
			<button className={classes.rowItem} onClick={onlyStory}>
				Only Story
			</button>
			{/* <button className={classes.rowItem} onClick={posted}>Posted</button> */}
			{/* 
			<button className={classes.rowItem} onClick={notPosted}>Not Posted</button> */}
		</div>
	);
}

export default MessageFilter;
