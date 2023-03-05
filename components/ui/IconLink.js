import Link from 'next/link';
import Icon from './Icon';
import classes from './IconLink.module.css';

function IconLink(props) {
	return (
		<Link
			className={classes.iconColor}
			href={props.href}
			target={props.newTab ? '_blank' : ''}
		>
			<Icon filename={props.filename} alt={props.alt} w={props.w} h={props.h} />
		</Link>
	);
}

export default IconLink;
