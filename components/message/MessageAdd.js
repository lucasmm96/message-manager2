import MessageAddForm from '@/components/message/add/MessageAddForm';

import Head from '@/components/layout/CustomHead';

function MessageEdit() {
  return (
    <>
      <Head title="Add Message" />
      <h1>Add Message</h1>
      <MessageAddForm />
    </>
  );
}

export default MessageEdit;
