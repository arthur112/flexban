import express from 'express';
import createError from 'http-errors';

export const error = async (
	err: createError.HttpError,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.status(err.status || 500).json({
		status: err.status,
		message: err.message,
	});
};
