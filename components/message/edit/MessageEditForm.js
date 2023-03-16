import { useState } from 'react';
import { useRouter } from 'next/router';

import Modal from '@/components/ui/Modal';
import ResponseBody from '../form/ResponseBody';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import MessageForm from '../form/MessageForm';

function MessageEditForm(props) {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resultFilename, setResultFilename] = useState('');
	const [resultAlt, setResultAlt] = useState('');
	const [responseData, setResponseData] = useState('');
	const [requestStatus, setRequestStatus] = useState(false);

	const [formData, setFormData] = useState({
		_id: { value: props.data._id, required: false, valid: true, onBlur: true },
		message: {
			value: props.data.message,
			required: true,
			valid: true,
			onBlur: true,
		},
		author: {
			value: props.data.author,
			required: true,
			valid: true,
			onBlur: true,
		},
		postedAt: {
			value: props.data.postedAt,
			required: false,
			valid: true,
			onBlur: false,
		},
		urlPost: {
			value: props.data.urlPost,
			required: false,
			valid: true,
			onBlur: false,
		},
		urlStory: {
			value: props.data.urlStory,
			required: false,
			valid: true,
			onBlur: false,
		},
	});

	function handleOpenModal(resFilename, resAlt, resData, resStatus) {
		setResultFilename(resFilename);
		setResultAlt(resAlt);
		setResponseData(resData);
		setRequestStatus(resStatus);
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
		if (requestStatus) {
			router.push('/');
		}
	}

	async function submitHandler(data) {
		try {
			const response = await fetch(`${process.env.API_URL}/message/update`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();
			const responseStatusCode = response.status;

			let resultFilename = 'circle-xmark-solid.svg';
			let resultAlt = 'Error';

			if (responseStatusCode === 200) {
				resultFilename = 'circle-check-solid.svg';
				resultAlt = 'Sucess';
			}

			if (responseStatusCode === 202 || responseStatusCode === 204) {
				resultFilename = 'circle-exclamation-solid.svg';
				resultAlt = 'Warning';
			}

			if (responseStatusCode === 400) {
				resultFilename = 'circle-xmark-solid.svg';
				resultAlt = 'Error';
			}

			handleOpenModal(resultFilename, resultAlt, responseData, response.ok);
		} catch (error) {
			let resultFilename = 'circle-xmark-solid.svg';
			let resultAlt = 'Error';
			let responseData = `Something went wrong. Error: (${error}).`;
			handleOpenModal(resultFilename, resultAlt, responseData, false);
		}
	}

	function cancelHandler() {
		router.push('/');
	}

	function changeHandler(formData) {
		setFormData(formData);
	}

	async function deleteHandler(data) {
		try {
			const response = await fetch(`${process.env.API_URL}/message/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();
			const responseStatusCode = response.status;

			let resultFilename = 'circle-xmark-solid.svg';
			let resultAlt = 'Error';

			if (responseStatusCode === 200) {
				resultFilename = 'circle-check-solid.svg';
				resultAlt = 'Sucess';
			}

			if (responseStatusCode === 202 || responseStatusCode === 204) {
				resultFilename = 'circle-exclamation-solid.svg';
				resultAlt = 'Warning';
			}

			if (responseStatusCode === 400) {
				resultFilename = 'circle-xmark-solid.svg';
				resultAlt = 'Error';
			}

			handleOpenModal(resultFilename, resultAlt, responseData, response.ok);
		} catch (error) {
			let resultFilename = 'circle-xmark-solid.svg';
			let resultAlt = 'Error';
			let responseData = `Something went wrong. Error: (${error}).`;
			handleOpenModal(resultFilename, resultAlt, responseData, false);
		}
	}

	function blurHandler(formData) {
		setFormData(formData);
	}

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				header={
					<Icon
						filename={resultFilename}
						alt={resultAlt}
						w={30}
						h={30}
						label={'Result'}
					/>
				}
				body={<ResponseBody response={responseData} />}
				footer={<Button click={handleCloseModal} label={'OK'} />}
			/>
			<MessageForm
				data={formData}
				onChangeHandler={changeHandler}
				onBlurHandler={blurHandler}
				onSubmitHandler={submitHandler}
				onCancelHandler={cancelHandler}
				onDeleteHandler={deleteHandler}
			/>
		</>
	);
}

export default MessageEditForm;
