import Image from 'next/image';

import classes from '@/components/ui/Icon.module.css';

function Icon(props) {
	return (
		<>
			<Image
				src={`/icons/${props.filename}`}
				alt={props.alt}
				width={props.w}
				height={props.h}
				priority
			/>
			{props.label ? <span className={classes.text}>{props.label}</span> : ''}
		</>
	);
}

export default Icon;
