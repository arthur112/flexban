import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { TaskController } from './controllers';
import { notFound, error } from './middlewares';
// import { mapper, initializeMapper } from '../service/Mapper';

export default class Server {
	private app: express.Application;
	private port: number;
	private taskController: TaskController;

	constructor() {
		this.app = express();
		this.configuration();
		this.controllers();
		this.routes();
		this.middlewares();
		this.mappers();
	}

	public configuration() {
		this.port = parseInt(process.env.PORT as string, 10) || 9000;
		var accessLogStream = fs.createWriteStream(
			path.join(__dirname, 'access.log'),
			{ flags: 'a' }
		);
		this.app.use(morgan('combined', { stream: accessLogStream }));
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	public controllers() {
		this.taskController = new TaskController();
	}

	public routes() {
		this.app.use('/task/', this.taskController.router);
	}

	public middlewares() {
		this.app.use(notFound);
		this.app.use(error);
	}

	public mappers() {
		// initializeMapper(mapper);
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}
