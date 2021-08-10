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

	public update(id: string, task: ITask): Promise<ITask> {
		return this.prisma.task.update({
			where: { id: id },
			data: { ...task },
		});
	}

	public delete(id: string): Promise<ITask> {
		return this.prisma.task.delete({ where: { id: id } });
	}
}
