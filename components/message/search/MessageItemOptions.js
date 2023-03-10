import { useRouter } from 'next/router';

import classes from './MessageItemOptions.module.css';
import Button from '@/components/ui/Button';

function MessageItemOptions(props) {
	const link = props.link ? props.link : '';
	const isAvailable = props.link ? '' : classes.disabled;
	const data = props.data ? props.data : '';
	const newTab = props.newTab;

	const router = useRouter();

	function navigateToPage() {
		const query = { ...data };
		if (newTab) {
			window.open(link, '_blank');
		} else {
			router.push({
				pathname: link,
				query,
			});
		}
	}

	return (
		<Button
			classes={`${isAvailable}`}
			click={navigateToPage}
			label={props.label}
		/>
	);
}

export default MessageItemOptions;
