import classes from '@/components/message/form/ResponseBody.module.css';

function ResponseBody(props) {
	const response = props.response;

	return (
		<>
			<div className={classes.bodyContainer}>
				<div className={classes.responseResults}>{response.message}</div>
				{props.responseInfo && response.result.failed.map((failedItem) => {
					return (
						<>
							<h4>New message:</h4>
							<div className={classes.responseMessage}>
								{failedItem.message.message}
							</div>
							<h4>Similar messages:</h4>
							<div className={classes.similarityList}>
								{failedItem.similarity.map((similarityItem) => {
									return (
										<div className={classes.similarityListItem}>
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
					);
				})}
			</div>
		</>
	);
}

export default ResponseBody;
