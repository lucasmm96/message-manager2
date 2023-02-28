import classes from './MessageFilter.module.css';

function MessageFilter(props) {
	function filterData() {
		const messages = props.data;
		const filtered = messages.filter((message) => message.postUrl.story === '');
		props.onPostFilter(filtered);
	}

	return (
		<div className={classes.row}>
			<div className={classes.rowItem}>
				<button onClick={filterData}>Sem Story</button>
			</div>
			<div className={classes.rowItem}>Botão 02</div>
		</div>
	);
}

export default MessageFilter;
