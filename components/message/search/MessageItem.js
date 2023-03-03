import classes from './MessageItem.module.css';

import Card from '@/components/ui/Card';
import MessageItemBody from './MessageItemBody';
import MessageItemOptions from './MessageItemOptions';

function MessageItem(props) {
	return (
		<div className="container">
			{props.messages.map((message) => (
				<Card
					key={message._id}
					header={message.postedAt}
					body={
						<div className={classes.itemContainer}>
							<MessageItemBody
								message={message.message}
								author={message.author}
							/>
						</div>
					}
					footer={
						<div className={classes.itemContainer}>
							<MessageItemOptions
								link={message.postUrl.post ? message.postUrl.post : ''}
								data=""
								label="Post"
								newTab={true}
							/>
							<MessageItemOptions
								link={message.postUrl.story ? message.postUrl.story : ''}
								data=""
								label="Story"
								newTab={true}
							/>
							<MessageItemOptions
								link={'/edit-message/'}
								data={{
									...message,
									urlPost: message.postUrl.post,
									urlStory: message.postUrl.story,
								}}
								label="Edit"
								newTab={false}
							/>
						</div>
					}
				/>
			))}
		</div>
	);
}

export default MessageItem;
