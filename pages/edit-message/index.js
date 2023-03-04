import { useRouter } from 'next/router';

import Head from '@/components/layout/CustomHead';
import MessageEdit from '@/components/message/MessageEdit';

function EditMessage() {
	const router = useRouter();
	const message = { ...router.query };

	return (
		<>
			<Head title="Edit Message" />
			<MessageEdit data={message} />
		</>
	);
}

export default EditMessage;
