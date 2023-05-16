import { useRouter } from 'next/router';

import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

function ModalResults(props) {
	const router = useRouter();

	const responseStatus = props.responseStatus;

	let filename, alt;
	if (responseStatus === 'SUCESS') {
		filename = 'circle-check-solid.svg';
		alt = 'Sucess';
	}

	if (responseStatus === 'WARNING') {
		filename = 'circle-exclamation-solid.svg';
		alt = 'Warning';
	}

	if (responseStatus === 'ERROR') {
		filename = 'circle-xmark-solid.svg';
		alt = 'Error';
	}

	function closeHandler() {
		if (responseStatus !== 'ERROR') {
			router.push('/');
		}
		props.onCloseHandler();
	}

	return (
		<Modal
			isOpen={props.isModalOpen}
			header={
				<Icon label="Result" filename={filename} alt={alt} w={30} h={30} />
			}
			body={props.responseData}
			footer={<Button label="OK" click={closeHandler} />}
		/>
	);
}

export default ModalResults;
