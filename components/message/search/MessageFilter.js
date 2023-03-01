import { useState } from 'react';

import classes from './MessageFilter.module.css';

import MessageFilterButton from './MessageFilterButton';

function MessageFilter(props) {
	const messages = props.data;

	const [selections, setSelections] = useState({
		allMessages: true,
		postedMessages: false,
		notPostedMessages: false,
	});

	function allMessages() {
		setSelections({
			allMessages: true,
			postedMessages: false,
			notPostedMessages: false,
		});
		props.onApplyFilter(messages);
	}

	function postedMessages() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) <= new Date()
		);

		setSelections({
			allMessages: false,
			postedMessages: true,
			notPostedMessages: false,
		});
		props.onApplyFilter(filteredData);
	}

	function notPostedMessages() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) >= new Date()
		);
		setSelections({
			allMessages: false,
			postedMessages: false,
			notPostedMessages: true,
		});
		props.onApplyFilter(filteredData);
	}

	return (
		<div className={classes.filterContainer}>
			<MessageFilterButton
				method={allMessages}
				label="All"
				selected={selections.allMessages}
			/>
			<MessageFilterButton
				method={postedMessages}
				label="Posted"
				selected={selections.postedMessages}
			/>
			<MessageFilterButton
				method={notPostedMessages}
				label="Not Posted"
				selected={selections.notPostedMessages}
			/>
		</div>
	);
}

export default MessageFilter;
