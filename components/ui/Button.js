import classes from '@/components/ui/Button.module.css';

function Button(props) {
	const button = classes.button;
	const customClass = props.classes ? props.classes : '';
	const selected = props.selected ? classes.selected : '';
	const disabled = props.disabled ? classes.disabled : '';
	const click = props.click ? props.click : null;
	const label = props.label;

	return (
		<button
			className={`${button} ${customClass} ${selected} ${disabled}`}
			onClick={click}
		>
			{label}
		</button>
	);
}

export default Button;
