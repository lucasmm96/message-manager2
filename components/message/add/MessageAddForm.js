import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '@/context/AuthContext';
import post from '@/utils/httpRequests/post';
import statusCodeHandler from '@/utils/statusCodeHandler';
import MessageForm from '@/components/message/form/MessageForm';
import MessageChangeResponse from '@/components/message/MessageChangeResponse';

function MessageAddForm() {
  const router = useRouter();
  const auth = useContext(AuthContext);

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
      const response = await post('/message/add', data, auth.token);
      const responseJSON = await response.json();
      const responseStatusCode = response.status;

      setResponseData(<MessageChangeResponse response={responseJSON} />);

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
    router.replace('/message/list');
  }

  function closeHandler() {
    setIsModalOpen(false);
    router.replace('/message/add');
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
