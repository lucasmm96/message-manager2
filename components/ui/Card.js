import classes from '@/components/ui/Card.module.css';

function Card(props) {
	return (
		<div className={`${classes.card} containerItem`}>
			<div className={classes.cardHeader}>{props.header}</div>
			<div className={`${classes.cardBody} ${classes.cardBodyContainer}`}>
				{props.body}
			</div>
			<div className={classes.cardFooter}>{props.footer}</div>
		</div>
	);
}

export default Card;
