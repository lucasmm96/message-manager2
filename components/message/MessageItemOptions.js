import classes from './MessageItemOptions.module.css';

function MessageItemOptions(props) {
	const isAvailable = props.link ? '' : classes.disabledItemLink;
	return (
		<a
			href={props.link}
			className={`${classes.itemLink} ${isAvailable}`}
			target={props.newTab ? '_blank' : ''}
		>
			{props.label}
		</a>
	);
}

export default MessageItemOptions;
