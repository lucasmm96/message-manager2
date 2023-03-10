import classes from './Button.module.css';

function Button(props) {
	return (
		<button
			className={`${classes.button} ${props.classes}`}
			onClick={props.click ? props.click : null}
		>
			{props.label}
		</button>
	);
}

export default Button;
