import { useState } from 'react';
import { useRouter } from 'next/router';

import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import ResponseBody from './ResponseBody';

function MessageAddForm() {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resultFilename, setResultFilename] = useState('');
	const [resultAlt, setResultAlt] = useState('');
	const [responseData, setResponseData] = useState('');
	const [requestStatus, setRequestStatus] = useState(false);

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

	const fields = [
		{
			name: 'message',
			label: 'Message',
			type: 'text',
			required: true,
		},
		{
			name: 'author',
			label: 'Author',
			type: 'text',
			required: true,
		},
		{
			name: 'postedAt',
			label: 'Post Date',
			type: 'date',
			required: false,
		},
		{
			name: 'urlPost',
			label: 'Post Link',
			type: 'url',
			required: false,
		},
		{
			name: 'urlStory',
			label: 'Story Link',
			type: 'url',
			required: false,
		},
	];

	async function submitHandler(data) {
		const bodyData = [
			{
				_id: data._id,
				message: data.message,
				author: data.author,
				postedAt: data.postedAt,
				postUrl: {
					post: data.urlPost,
					story: data.urlStory,
				},
			},
		];

		try {
			const response = await fetch(`${process.env.API_URL}/message/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
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
			<div className="container">
				<Form
					fields={fields}
					saveButton={true}
					cancelButton={true}
					onSubmitHandler={submitHandler}
					onCancelHandler={cancelHandler}
				/>
			</div>
		</>
	);
}

export default MessageAddForm;
