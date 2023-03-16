import classes from '@/components/layout/Layout.module.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function Layout(props) {
	return (
		<div>
			<Header />
			<main className={classes.main}>{props.children}</main>
			<Footer />
		</div>
	);
}

export default Layout;
