import Image from 'next/image';

function Icon(props) {
	return (
		<Image
			src={`/icons/${props.filename}`}
			alt={props.alt}
			width={props.w}
			height={props.h}
			priority
		/>
	);
}

export default Icon;