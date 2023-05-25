import Head from 'next/head';

function CustomHead(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Message Manager" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default CustomHead;
