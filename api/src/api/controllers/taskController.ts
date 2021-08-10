import express, { NextFunction, Request, Response, Router } from 'express';
import { ITask } from '../../models/entities';
import { TaskService } from '../../services';
import createError from 'http-errors';

export class TaskController {
	public router: Router;
	private taskService: TaskService;

	constructor() {
		this.taskService = new TaskService();
		this.router = express.Router();
		this.routes();
	}

	public create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const task = req.body as ITask;
			const newTask = await this.taskService.create(task);

			res.status(201).send(newTask);
		} catch (error) {
			next(new createError[500](error.message));
		}
	};

	public put = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const task = req.body as ITask;
			const newTask = await this.taskService.update(req.params.id, task);

			res.status(201).send(newTask);
		} catch (error) {
			next(new createError[500](error.message));
		}
	};

	public get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.taskService.get();

			res.status(200).send(tasks);
		} catch (error) {
			next(new createError[500](error.message));
		}
	};

	public delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const task = await this.taskService.delete(req.params.id);

			res.status(200).send(task);
		} catch (error) {
			next(new createError[500](error.message));
		}
	};

	public routes() {
		this.router.post('/', this.create);
		this.router.get('/', this.get);
		this.router.put('/:id', this.put);
		this.router.delete('/:id', this.delete);
	}
}
