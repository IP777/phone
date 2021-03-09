const logger = (store) => (next) => (action) => {
	console.log(action.type, action.payload, store);
	console.group(action.type);
	console.info("dispatching", action);
	console.groupEnd(action.type);

	return next(action);
};

export default logger;
