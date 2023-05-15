import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMedia } from 'react-use';

import classes from '@/components/layout/Header.module.css';

import AuthContext from '@/context/AuthContext';
import IconLink from '@/components/ui/IconLink';
import Dropdown from '../ui/Dropdown';

function MainNavigation() {
	const auth = useContext(AuthContext);

	const smallScreen = useMedia('(max-width: 768px)', false);
	const router = useRouter();

	function authHandler() {
		if (auth.isLoggedIn) {
			auth.logout();
		}
		router.replace('/auth/login');
	}

	return (
		<header className={classes.header}>
			<nav>
				<ul>
					<li className={`${classes.logo} ${classes.left}`}>
						<IconLink
							href={'/'}
							newTab={false}
							filename="logo.svg"
							alt="Logo"
							text="Message Manager"
							w={20}
							h={20}
						/>
					</li>
					{!smallScreen && (
						<>
							<li className={`${classes.login} ${classes.right}`}>
								<a onClick={authHandler}>
									{auth.isLoggedIn ? 'Logout' : 'Login'}
								</a>
							</li>
							<li className={classes.right}>
								<Link href="/add-message">Add New Message</Link>
							</li>
							<li className={classes.right}>
								<Link href="/">All Messages</Link>
							</li>
						</>
					)}
					{smallScreen && (
						<li className={`${classes.logo} ${classes.right}`}>
							<Dropdown icon={{ filename: 'bars-solid.svg', alt: 'Options' }}>
								<li>
									<Link href="/">All Messages</Link>
								</li>
								<li>
									<Link href="/">Add New Message</Link>
								</li>
								<li>
									<a onClick={authHandler}>
										{auth.isLoggedIn ? 'Logout' : 'Login'}
									</a>
								</li>
							</Dropdown>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
