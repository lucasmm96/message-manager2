import { useState } from 'react';

import classes from './MessageFilter.module.css';

import MessageFilterButton from './MessageFilterButton';

function MessageFilter(props) {
	const messages = props.data;
	const [isAllMessagesSelected, setIsAllMessagesSelected] = useState(false);
	const [isPostedMessagesSelected, setIsPostedMessagesSelected] =
		useState(false);
	const [isNotPostedMessagesSelected, setIsNotPostedMessagesSelected] =
		useState(false);

	function setSelectedStatus(status) {
		setIsAllMessagesSelected(status[0]);
		setIsPostedMessagesSelected(status[1]);
		setIsNotPostedMessagesSelected(status[2]);
	}

	function allMessages() {
		setSelectedStatus([true, false, false]);
		props.onApplyFilter(messages);
	}

	function postedMessages() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) <= new Date()
		);
		setSelectedStatus([false, true, false]);
		props.onApplyFilter(filteredData);
	}

	function notPostedMessages() {
		const filteredData = messages.filter(
			(message) => new Date(message.postedAt) >= new Date()
		);
		setSelectedStatus([false, false, true]);
		props.onApplyFilter(filteredData);
	}

	return (
		<div className={classes.filterContainer}>
			<MessageFilterButton method={allMessages} label="All" selected={isAllMessagesSelected} />
			<MessageFilterButton method={postedMessages} label="Posted" selected={isPostedMessagesSelected} />
			<MessageFilterButton method={notPostedMessages} label="Not Posted" selected={isNotPostedMessagesSelected} />
		</div>
	);
}

export default MessageFilter;
