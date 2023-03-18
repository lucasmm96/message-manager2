import { useState } from 'react';
import { useRouter } from 'next/router';

import statusCodeHandler from '@/utils/statusCodeHandler';
import MessageForm from '@/components/message/form/MessageForm';
import MessageAddResponse from './MessageAddResponse';

function MessageAddForm() {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [responseStatus, setResponseStatus] = useState('ERROR');
	const [responseData, setResponseData] = useState({});

	const [formData, setFormData] = useState({
		message: { value: '', required: true, valid: false, onBlur: false },
		author: { value: '', required: true, valid: false, onBlur: false },
		postedAt: { value: '', required: false, valid: true, onBlur: false },
		urlPost: { value: '', required: false, valid: true, onBlur: false },
		urlStory: { value: '', required: false, valid: true, onBlur: false },
	});

	function blurHandler(formData) {
		setFormData(formData);
	}

	function changeHandler(formData) {
		setFormData(formData);
	}

	async function submitHandler(data) {
		try {
			const response = await fetch(`${process.env.API_URL}/message/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseJSON = await response.json();
			const responseStatusCode = response.status;

			setResponseData(<MessageAddResponse response={responseJSON} />);

			const { resStatus, resData } = statusCodeHandler(responseStatusCode);

			setResponseStatus(resStatus);

			if (resData !== '') {
				setResponseData(resData);
			}
		} catch (error) {
			setResponseStatus('ERROR');
			setResponseData(`Something went wrong. Error: (${error}).`);
		}

		setIsModalOpen(true);
	}

	function cancelHandler() {
		router.push('/');
	}

	function closeHandler() {
		setIsModalOpen(false);
	}

	return (
		<MessageForm
			data={formData}
			onBlurHandler={blurHandler}
			onChangeHandler={changeHandler}
			onSubmitHandler={submitHandler}
			onCancelHandler={cancelHandler}
			onCloseHandler={closeHandler}
			modalType="RESULTS"
			isModalOpen={isModalOpen}
			responseStatus={responseStatus}
			responseData={responseData}
		/>
	);
}

export default MessageAddForm;
