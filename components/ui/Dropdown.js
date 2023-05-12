import React, { useState } from 'react';
import Link from 'next/link';

import classes from '@/components/ui/Dropdown.module.css';

import Icon from '@/components/ui/Icon';

function Dropdown(props) {
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
				<Icon
					filename={props.icon.filename}
					alt={props.icon.alt}
					w={props.icon.w}
					h={props.icon.h}
				/>
			</a>
			{isOpen && (
				<ul
					className={classes.menu}
					onMouseOver={openMenu}
					onMouseLeave={closeMenu}
				>
					{props.list.map((item) => (
						<li>
							<Link href={item.href}>{item.label}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;
