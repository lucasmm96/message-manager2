import classes from '@/components/message/search/MessageItem.module.css';

import Card from '@/components/ui/Card';
import MessageItemBody from '@/components/message/search/MessageItemBody';
import MessageItemOptions from '@/components/message/search/MessageItemOptions';

function MessageItem(props) {
  const messages = props.messages.map((message) => {
    let currentMessage = {
      _id: message._id,
      message: message.message,
      author: message.author,
      addedAt: message.addedAt,
      postedAt: message.postedAt,
    };

    if (!message.postUrl) {
      return {
        ...currentMessage,
        urlPost: '',
        urlStory: '',
      };
    }

    return {
      ...currentMessage,
      urlPost: message.postUrl.post ? message.postUrl.post : '',
      urlStory: message.postUrl.story ? message.postUrl.story : '',
    };
  });

  return (
    <div className="container">
      {messages.map((message) => (
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
                link={message.urlPost}
                data=""
                label="Post"
                newTab={true}
              />
              <MessageItemOptions
                link={message.urlStory}
                data=""
                label="Story"
                newTab={true}
              />
              <MessageItemOptions
                link={'/message/edit'}
                data={{ ...message }}
                label="Details"
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
