import classes from '@/components/ui/Modal.module.css';

function Modal(props) {
	if (!props.isOpen) {
		return null;
	}

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modal}>
				<div className={classes.modalHeader}>{props.header}</div>
				<div className={classes.modalBody}>{props.body}</div>
				<div className={classes.modalFooter}>{props.footer}</div>
			</div>
		</div>
	);
}

export default Modal;
