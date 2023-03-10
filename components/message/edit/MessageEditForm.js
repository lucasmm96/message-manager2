import { useRouter } from 'next/router';
import { useState } from 'react';

import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

function MessageEditForm(props) {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resultFilename, setResultFilename] = useState('');
	const [resultAlt, setResultAlt] = useState('');
	const [resultText, setResultText] = useState('');

	function handleOpenModal(resultFilename, resultAlt, resultText) {
		setResultFilename(resultFilename);
		setResultAlt(resultAlt);
		setResultText(resultText);
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
		router.push('/');
	}

	const fields = [
		{
			name: 'message',
			label: 'Message',
			type: 'text',
			required: true,
			data: props.data.message,
		},
		{
			name: 'author',
			label: 'Author',
			type: 'text',
			required: true,
			data: props.data.author,
		},
		{
			name: 'postedAt',
			label: 'Post Date',
			type: 'date',
			required: false,
			data: props.data.postedAt,
		},
		{
			name: 'urlPost',
			label: 'Post Link',
			type: 'url',
			required: false,
			data: props.data.urlPost,
		},
		{
			name: 'urlStory',
			label: 'Story Link',
			type: 'url',
			required: false,
			data: props.data.urlStory,
		},
	];

	const structuredData = {
		_id: props.data._id,
		message: props.data.message,
		author: props.data.author,
		postedAt: props.data.postedAt,
		urlPost: props.data.urlPost,
		urlStory: props.data.urlStory,
	};

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
			const response = await fetch(`${process.env.API_URL}/message/update`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
			});

			const statusCode = response.status;
			let resultFilename = 'circle-xmark-solid.svg';
			let resultAlt = 'Error';
			let resultText = 'Something went wrong';

			if (statusCode === 200) {
				resultFilename = 'circle-check-solid.svg';
				resultAlt = 'Sucess';
				resultText = 'The request has been successfully processed';
			}

			if (statusCode === 202 || statusCode === 204) {
				resultFilename = 'circle-exclamation-solid.svg';
				resultAlt = 'Warning';
			}

			if (statusCode === 202) {
				resultText = 'The request has been partially processed.';
			}

			if (statusCode === 204) {
				resultText = 'The request is empty.';
			}

			if (statusCode === 400) {
				resultFilename = 'circle-xmark-solid.svg';
				resultAlt = 'Error';
				resultText = 'The request has failed.';
			}

			if (statusCode >= 500) {
				resultFilename = 'circle-xmark-solid.svg';
				resultAlt = 'Error';
				resultText = response.json();
				resultText = `Something went wrong. Error: (${resultText.error.message}).`;
			}

			handleOpenModal(resultFilename, resultAlt, resultText);
		} catch (error) {}
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
				body={resultText}
				footer={<Button click={handleCloseModal} label={'OK'} />}
			/>
			<div className="container">
				<Form
					fields={fields}
					data={structuredData}
					onSubmitHandler={submitHandler}
					onCancelHandler={cancelHandler}
				/>
			</div>
		</>
	);
}

export default MessageEditForm;
