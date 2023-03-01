import classes from './Header.module.css';
import Link from 'next/link';

function MainNavigation() {
	return (
		<header className={classes.header}>
			<nav>
				<ul>
					<li className={`${classes.logo} ${classes.left}`}>
						<Link href="/">Message Manager</Link>
					</li>
					<li className={classes.right}>
						<Link href="/add-message">Add New Message</Link>
					</li>
					<li className={classes.right}>
						<Link href="/">All Messages</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
