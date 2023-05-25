import { useRouter } from 'next/router';

import MessageEdit from '@/components/message/MessageEdit';

function EditMessage() {
  const router = useRouter();
  const message = { ...router.query };

  return <MessageEdit data={message} />;
}

export default EditMessage;
