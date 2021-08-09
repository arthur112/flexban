import express from 'express';
import createError from 'http-errors';

export const notFound = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	next(new createError.NotFound('Route not Found'));
};
