import MessageEditForm from '@/components/message/edit/MessageEditForm';

import Head from '@/components/layout/CustomHead';

function MessageEdit(props) {
  return (
    <>
      <Head title="Edit Message" />
      <h1>Edit Message</h1>
      <MessageEditForm data={props.data} />
    </>
  );
}

export default MessageEdit;
