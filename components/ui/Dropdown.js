import React, { useState } from 'react';
import Link from 'next/link';
import classes from '@/components/ui/Dropdown.module.css';

import Icon from '@/components/ui/Icon';

function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);

	function openMenu() {
		setIsOpen(true);
	}

	function closeMenu() {
		setIsOpen(false);
	}

	return (
		<div>
			<a className={classes.iconButton} onMouseOver={openMenu}>
				<Icon filename="circle-user-solid.svg" alt="Auth" w={20} h={20} />
			</a>
			{isOpen && (
				<ul
					className={classes.menu}
					onMouseOver={openMenu}
					onMouseLeave={closeMenu}
				>
					<li>
						<Link href="/auth/login">Login</Link>
					</li>
					<li>
						<Link href="/auth/signup">Signup</Link>
					</li>
				</ul>
			)}
		</div>
	);
}

export default Dropdown;
