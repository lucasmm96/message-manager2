import Icon from './Icon';
import classes from './Modal.module.css';

function Modal(props) {
	if (!props.isOpen) {
		return null;
	}

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modal}>
				<div className={classes.modalClose} onClick={props.onClose}>
					<Icon filename="close.svg" alt="Close Modal" w={25} h={25} />
				</div>
				<div className={classes.modalContent}>{props.children}</div>
			</div>
		</div>
	);
}

export default Modal;
