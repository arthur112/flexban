import { State } from './../models/entities/state';
import { ITask } from '../models/entities';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';

export class TaskService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public get(): Promise<ITask[]> {
		return this.prisma.task.findMany();
	}

	public create(task: ITask): Promise<ITask> {
		const newTask: ITask = {
			id: new ObjectId().toString(),
			description: task.description || '',
			state: task.state || State.Todo,
			author: task.author || 'Unknown',
		};

		return this.prisma.task.create({
			data: { ...newTask },
		});
	}
}
