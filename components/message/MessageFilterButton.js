import classes from './MessageFilterButton.module.css';

function MessageFilterButton(props) {
	const isSelected = props.selected ? classes.selected : '';
	const buttonClasses = `${classes.button} ${isSelected} containerItem`;
	return (
		<button className={buttonClasses} onClick={props.method}>
			{props.label}
		</button>
	);
}

export default MessageFilterButton;
