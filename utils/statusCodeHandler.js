function statusCodeHandler(statusCode) {
	switch (statusCode) {
		case 200:
			return { resStatus: 'SUCESS', resData: '' };
		case 202 || 204:
			return { resStatus: 'WARNING', resData: '' };
		case 400:
			return { resStatus: 'ERROR', resData: '' };
		default:
			return { resStatus: 'ERROR', resData: 'Something went wrong.' };
	}
}

export default statusCodeHandler;
