import Link from 'next/link';

import classes from '@/components/message/MessageItem.module.css';

import Card from '@/components/ui/Card';

function MessageItem(props) {
	return (
		<>
			{props.messages.map((message) => (
				<Card key={message._id}>
					<div className={classes.header}>{message.postedAt}</div>
					<div className={classes.body}>
						<p>{message.message}</p>
						<p><i>{message.author}</i></p>
					</div>
					<div className={classes.footer}>
						{message.postUrl.post && (
							<Link href={message.postUrl.post} className={`${classes.footerItem} ${classes.messageItemButton}`} target="_blank">
								Post
							</Link>
						)}
						{message.postUrl.story && (
							<Link href={message.postUrl.story} className={`${classes.footerItem} ${classes.messageItemButton}`} target="_blank">
								Story
							</Link>
						)}
					</div>
				</Card>
			))}
		</>
	);
}

export default MessageItem;

{
	/* <div className={classes.footer}>
<ul className={classes.flexContainer}>
  <li className={classes.flexItem}>{message.postUrl.post}</li>
  <li className={classes.flexItem}>{message.postUrl.story}</li>
</ul>
</div> */
}
