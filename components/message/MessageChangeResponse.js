import classes from '@/components/message/MessageChangeResponse.module.css';

function MessageChangeResponse(props) {
  const response = props.response;

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.responseResults}>{response.message}</div>
      {response.result.failed.map((failedItem, index) => {
        return (
          <div key={index}>
            {failedItem.hasOwnProperty('similarity') && (
              <>
                <h4>New message:</h4>
                <div className={classes.responseMessage}>
                  {failedItem.message.message}
                </div>
                <h4>Similar messages:</h4>
                <div className={classes.similarityList}>
                  {failedItem.similarity.map((similarityItem, index) => {
                    return (
                      <div key={index} className={classes.similarityListItem}>
                        <div className={classes.similarityListItemPercentage}>
                          {similarityItem.ratio}
                        </div>
                        <div className={classes.similarityListItemMessage}>
                          {similarityItem.similarTo}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {!failedItem.hasOwnProperty('similarity') && (
              <>
                <div className={classes.responseMessage}>
                  {failedItem.error}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MessageChangeResponse;
