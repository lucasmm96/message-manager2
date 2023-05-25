import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/context/AuthContext';
import post from '@/utils/httpRequests/post';
import statusCodeHandler from '@/utils/statusCodeHandler';
import MessageForm from '@/components/message/form/MessageForm';

function MessageEditForm(props) {
	const router = useRouter();
	const auth = useContext(AuthContext);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('');
	const [responseStatus, setResponseStatus] = useState('ERROR');
	const [responseData, setResponseData] = useState('');

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

	function blurHandler(formData) {
		setFormData(formData);
	}

	function changeHandler(formData) {
		setFormData(formData);
	}

	async function submitHandler(data) {
		try {
			const response = await post('/message/update', data, auth.token);
			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			setResponseData(responseJSON.message);

			const { resStatus, resData } = statusCodeHandler(responseStatusCode);

			setResponseStatus(resStatus);

			if (resData !== '') {
				setResponseData(resData);
			}
		} catch (error) {
			setResponseStatus('ERROR');
			setResponseData(`Something went wrong. Error: (${error}).`);
		}
		setModalType('RESULTS');
		setIsModalOpen(true);
	}

	function cancelHandler() {
		router.replace('/message/list');
	}

	function closeHandler() {
		setIsModalOpen(false);
		router.replace('/message/edit');
	}

	function deleteHandlerConfirmation() {
		setModalType('CONFIRMATION');
		setIsModalOpen(true);
	}

	async function deleteHandler(data) {
		try {
			const response = await post('/message/delete', data, auth.token);

			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			setResponseData(responseJSON.message);

			switch (responseStatusCode) {
				case 200:
					setResponseStatus('SUCESS');
					break;
				case 202 || 204:
					setResponseStatus('WARNING');
					break;
				case 400:
					setResponseStatus('ERROR');
					break;
				default:
					setResponseStatus('ERROR');
					setResponseData('Something went wrong.');
					break;
			}
		} catch (error) {
			setResponseStatus('ERROR');
			setResponseData(`Something went wrong. Error: (${error}).`);
		}

		setModalType('RESULTS');
		setIsModalOpen(true);
	}

	return (
		<MessageForm
			data={formData}
			onBlurHandler={blurHandler}
			onChangeHandler={changeHandler}
			onSubmitHandler={submitHandler}
			onCancelHandler={cancelHandler}
			onDeleteHandlerConfirmation={deleteHandlerConfirmation}
			onDeleteHandler={deleteHandler}
			onCloseHandler={closeHandler}
			modalType={modalType}
			isModalOpen={isModalOpen}
			responseStatus={responseStatus}
			responseData={responseData}
		/>
	);
}

export default MessageEditForm;
