import { useState } from 'react';

import classes from '@/components/message/search/MessageFilter.module.css';

import MessageFilterButton from '@/components/message/search/MessageFilterButton';
import MessageFilterInput from '@/components/message/search/MessageFilterInput';

function MessageFilter(props) {
	const messages = props.data;

	const [selections, setSelections] = useState({
		allMessages: true,
		postedMessages: false,
		notPostedMessages: false,
		customSearch: false,
	});

	const [searchText, setSearchText] = useState('');

	function allMessages() {
		setSelections({
			allMessages: true,
			postedMessages: false,
			notPostedMessages: false,
			customSearch: false,
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
			customSearch: false,
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
			customSearch: false,
		});
		props.onApplyFilter(filteredData);
	}

	function changeHandler(event) {
		setSearchText(event.target.value);
		customSearch();
	}

	function customSearch() {
		let filteredData = messages;

		if (searchText.length > 0) {
			filteredData = messages.filter((item) => {
				return (
					item.message.toLowerCase().includes(searchText.toLowerCase()) ||
					item.author.toLowerCase().includes(searchText.toLowerCase()) ||
					item.postedAt.includes(searchText)
				);
			});
		}

		setSelections({
			allMessages: false,
			postedMessages: false,
			notPostedMessages: false,
			customSearch: true,
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
			<MessageFilterInput
				method={changeHandler}
				label="Custom Search"
				selected={selections.customSearch}
				value={searchText}
				onChangeHandler={changeHandler}
			/>
		</div>
	);
}

export default MessageFilter;
