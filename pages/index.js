import { useRouter } from 'next/router';
import { useContext } from 'react';

import AuthContext from '@/context/AuthContext';
import Head from '@/components/layout/CustomHead';
import Button from '@/components/ui/Button';

function Home() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  function ListMessageHandler() {
    router.push('/message/list');
  }

  function AddMessageHandler() {
    router.push('/message/add');
  }

  function authHandler() {
    if (auth.isLoggedIn) {
      auth.logout();
    }
    router.replace('/auth/login');
  }

  return (
    <>
      <Head title="Message Manager" />
      <h1>Welcome to Message Manager</h1>
      <p>As part of my web learning journey, this is an open-source application developed to store citations, and any art created for the message, and plan their publication on social networks.</p>
      <p style={{ marginTop: '50px' }}>Check below some quick options:</p>
      <div className="container">
        <Button
          classes="containerItem"
          label="List Messages"
          click={ListMessageHandler}
        />
        <Button
          classes="containerItem"
          label="Add Messages"
          click={AddMessageHandler}
        />
        <Button
          classes="containerItem"
          label={auth.isLoggedIn ? 'Logout' : 'Login'}
          click={authHandler}
        />
      </div>
    </>
  );
}

export default Home;
