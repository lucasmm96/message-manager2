import classes from './MessageFilterButton.module.css';

import Button from '@/components/ui/Button';

function MessageFilterButton(props) {
	const isSelected = props.selected ? classes.selected : '';
	return (
		<Button
			classes={`${isSelected} containerItem`}
			click={props.method}
			label={props.label}
		/>
	);
}

export default MessageFilterButton;
