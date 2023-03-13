import { useRouter } from 'next/router';

import Button from '@/components/ui/Button';

function MessageItemOptions(props) {
	const link = props.link ? props.link : '';
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
			click={navigateToPage}
			label={props.label}
			disabled={!props.link ? true : false}
		/>
	);
}

export default MessageItemOptions;
