import Head from 'next/head';

function CustomHead(props) {
	return (
		<Head>
			<title>{props.title}</title>
			<meta name="description" content="Message Manager" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
		</Head>
	);
}

export default CustomHead;
