import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Message Manager</div>
			<nav>
				<ul>
					<li>
						<Link href="/">All Messages</Link>
					</li>
					<li>
						<Link href="/add-message">Add New Message</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
