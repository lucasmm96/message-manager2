import Head from 'next/head';

import MessageAdd from '@/components/message/MessageAdd';

function AddMessage() {
	return (
		<>
			<Head title="Add Message" />
			<MessageAdd />
		</>
	);
}

export default AddMessage;
