import classes from './MessageItemOptions.module.css';
import Link from 'next/link';

function MessageItemOptions(props) {
	const isAvailable = props.link ? '' : classes.disabledItemLink;
	return (
		<Link
			href={props.link}
			className={`${classes.itemLink} ${isAvailable}`}
			target={props.newTab ? '_blank' : ''}
		>
			{props.label}
		</Link>
	);
}

export default MessageItemOptions;
