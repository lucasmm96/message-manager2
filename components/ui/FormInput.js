import IconLink from './IconLink';

import classes from './FormInput.module.css';

function FormInput(props) {
	function onChangeHandler(event) {
		props.onChangeHandler(event);
	}

	function onBlurHandler(event) {
		props.onBlurHandler(event);
	}

	return (
		<div className={classes.group}>
			{props.type === 'url' && (
				<div>
					<label className={classes.label} htmlFor={props.name}>
						{props.label}
					</label>
					<IconLink
						href={props.name}
						newTab={true}
						filename="link.svg"
						alt="Open Link"
						w={20}
						h={20}
					/>
				</div>
			)}
			{props.type !== 'url' && (
				<label className={classes.label} htmlFor={props.name}>
					{props.label}
				</label>
			)}
			<input
				id={props.name}
				className={classes.input}
				type={props.type}
				name={props.name}
				value={props.value || ''}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
			/>
			{props.required && !props.valid && props.blur && (
				<span className={classes.error}>This field is required</span>
			)}
		</div>
	);
}

module.exports = FormInput;
