import React, { useState } from 'react';

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
					w={20}
					h={20}
				/>
			</a>
			{isOpen && (
				<ul
					className={classes.menu}
					onMouseOver={openMenu}
					onMouseLeave={closeMenu}
				>
					{props.children}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;
