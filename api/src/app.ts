import { PrismaClient } from '@prisma/client';
import Server from './api/Server';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	const server: Server = new Server();
	server.start();
}

main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
