import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

function ModalConfirmation(props) {
	function modalConfirmHandler(event) {
		props.onDeleteHandler(event);
	}

	function modalCancelHandler() {
		props.onCloseHandler();
	}

	return (
		<Modal
			isOpen={props.isModalOpen}
			header={
				<Icon
					label="Confirmation"
					filename="circle-exclamation-solid.svg"
					alt="Warning"
					w={30}
					h={30}
				/>
			}
			body="The record is going to removed. Are you sure?"
			footer={
				<>
					<Button click={modalConfirmHandler} label="Confirm" />
					<Button click={modalCancelHandler} label="Cancel" />
				</>
			}
		/>
	);
}

export default ModalConfirmation;
