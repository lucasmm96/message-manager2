import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import Form from '@/components/ui/Form';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import Modal from '../ui/Modal';

import post from '@/utils/httpRequests/post';
import AuthContext from '@/context/AuthContext';

function Login(props) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    header: '',
    body: '',
    footer: '',
  });

  const [loginData, setLoginData] = useState({
    email: {
      value: '',
      required: true,
      valid: false,
      onBlur: false,
    },
    password: {
      value: '',
      required: true,
      valid: false,
      onBlur: false,
    },
  });

  function changeHandler(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setLoginData({
      ...loginData,
      [eventName]: {
        ...loginData[eventName],
        value: eventValue,
        valid: loginData[eventName].required
          ? eventValue !== ''
          : [eventName].valid,
      },
    });
  }

  function blurHandler(event) {
    const eventName = event.target.name;

    setLoginData({
      ...loginData,
      [eventName]: {
        ...loginData[eventName],
        onBlur: true,
      },
    });
  }

  function closeModalHandler() {
    setModalInfo({ ...modalInfo, isOpen: false });
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await post('/auth/login', {
        email: loginData.email.value,
        password: loginData.password.value,
      });
      const responseJSON = await response.json();
      const responseStatusCode = response.status;

      if (responseStatusCode >= 400) {
        throw new Error(responseJSON.error);
      }

      auth.login(responseJSON.token);
      router.replace('/');
    } catch (error) {
      setModalInfo({
        isOpen: true,
        header: 'Error',
        body: error.message,
        footer: <Button label="OK" click={closeModalHandler} />,
      });
    }
  }

  function onSelectSignupHandler(event) {
    event.preventDefault();
    props.onSelectSignupHandler();
  }

  return (
    <>
      <Modal
        isOpen={modalInfo.isOpen}
        header={modalInfo.header}
        body={modalInfo.body}
        footer={modalInfo.footer}
      />
      <Form
        input={
          <>
            <FormInput
              name="email"
              label="Email"
              type="email"
              required={loginData.email.required}
              value={loginData.email.value}
              valid={loginData.email.valid}
              blur={loginData.email.onBlur}
              onChangeHandler={changeHandler}
              onBlurHandler={blurHandler}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              required={loginData.password.required}
              value={loginData.password.value}
              valid={loginData.password.valid}
              blur={loginData.password.onBlur}
              onChangeHandler={changeHandler}
              onBlurHandler={blurHandler}
            />
          </>
        }
        actions={
          <>
            <Button
              label="Login"
              classes="containerItem"
              click={submitHandler}
              disabled={!loginData.email.valid || !loginData.password.valid}
            />
            <Button
              label="Switch to Signup"
              classes="containerItem"
              click={onSelectSignupHandler}
            />
          </>
        }
      />
    </>
  );
}

export default Login;
